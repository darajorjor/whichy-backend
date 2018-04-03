import Qs from 'qs'
import config from 'src/config'
import google from 'googleapis'
import { Device } from 'models'
import UserService from 'src/modules/users/services/user.service'
import uuid from 'uuid'

export default {

  loginInstagram(response, fullUrl) {
    return response.redirect(`https://api.instagram.com/oauth/authorize/?${Qs.stringify({
      client_id: config.instagramClientId,
      redirect_uri: fullUrl,
      response_type: 'code',
    })}`)
  },

  loginGoogle(fullUrl) {
    const OAuth2 = google.auth.OAuth2

    const client = new OAuth2(
      config.google.clientId,
      config.google.clientSecret,
      fullUrl,
    )
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]

    return client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',

      // If you only need one scope you can pass it as a string
      scope: scopes,

      // Optional property that passes state parameters to redirect URI
      // state: 'foo'
    })
  },

  requestGoogleAccessToken(code, fullUrl) {
    const OAuth2 = google.auth.OAuth2
    const plus = google.plus('v1')

    const client = new OAuth2(
      config.google.clientId,
      config.google.clientSecret,
      fullUrl,
    )

    return new Promise((resolve, reject) => {
      client.getToken(code, function (err, tokens) {
        if (err) return reject(err)
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        client.setCredentials(tokens)

        return plus.people.get({
          userId: 'me',
          auth: client,
        }, function (err, response) {
          if (err) return reject(err)

          resolve(response)
        })
      })
    })
  },

  async registerDevice({ uniqueId, type, appVersion, deviceInfo, oneSignalPushId }) {
    let device = await Device.findOne({ where: { unique_id: uniqueId, type } })
    if (!device) {
      device = await Device.create({
        unique_id: uniqueId,
        type,
        token: uuid(),
        device_info: deviceInfo,
        app_version: appVersion,
        push_id: oneSignalPushId,
        additional_data: {
          versionHistory: [{
            appVersion,
            date: new Date(),
          }],
        },
      })
      return {
        device,
        isRegistered: false,
      }
    }
    device.app_version = appVersion
    device.device_info = deviceInfo
    device.push_id = oneSignalPushId
    device.additional_data.versionHistory.push({
      appVersion,
      date: new Date(),
    })
    const updatedDevice = await Device.update({
      deviceId: device.id,
      updateData: device.toJSON(),
    }, {
      where: { id: device.id },
      returning: true,
    })

    return {
      device: updatedDevice[1][0],
      isRegistered: true,
    }
  },

  async createGuestUser(deviceInfo) {
    // create the device
    const { device, isRegistered } = await this.registerDevice(deviceInfo)

    let user = {}
    if (!isRegistered) {
      // create the user and attach device to it
      user = await UserService.registerUser(device)
    } else {
      user.session = await UserService.findByDeviceToken(device.token)
    }

    return {
      session: user.session,
      token: device.token,
    }
  },
}