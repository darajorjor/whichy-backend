import { Device } from 'models'
import uuid from 'uuid/v4'

export default {
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
      return device
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
      returning: true
    })
    return updatedDevice[1][0]
  },
}
