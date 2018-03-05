import DevicesService from '../services/devices.service'
import transformDevice from '../transformers/device.transformer'

export default {
  async registerDevice(req, res, next) {
    try {
      const {
        uniqueId,
        type,
        appVersion,
        deviceInfo,
        oneSignalPushId,
      } = req.body

      const device = await DevicesService.registerDevice({
        uniqueId,
        type,
        appVersion,
        deviceInfo,
        oneSignalPushId,
      })

      return res.build.success(transformDevice(device), res.messages.DEVICE_CREATED)
    } catch (error) {
      switch (error.message) {
        default:
          return next(error)
      }
    }
  },
}
