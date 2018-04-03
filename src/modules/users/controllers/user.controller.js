import userService from '../services/user.service'
import messages from 'src/constants/defaults/messages.default'
import { transformUserProfile, transformSelfProfile } from '../transformers/user.transformer'

export default {
  async getSelfProfile(req, res, next) {
    try {
      const { id } = req.user

      const user = await userService.getSelfUser(id)

      return res.build.success(transformSelfProfile(user))
    } catch (error) {
      switch (error.message) {
        case messages.USER_NOT_FOUND:
          return res.build.notFound(messages.USER_NOT_FOUND)
        default:
          return next(error)
      }
    }
  },
  async getUser(req, res, next) {
    try {
      const { userId } = req.params
      const { id } = req.user

      const user = await userService.getUser(userId, id)

      return res.build.success(transformUserProfile(user))
    } catch (error) {
      switch (error.message) {
        case messages.USER_NOT_FOUND:
          return res.build.notFound(messages.USER_NOT_FOUND)
        default:
          return next(error)
      }
    }
  },
  async updateUser(req, res, next) {
    try {
      const { id } = req.user
      const {
        gender,
        referrer,
      } = req.body

      const user = await userService.update(id, {
        gender,
        referrer,
      })

      return res.build.success(transformUserProfile(user))
    } catch (error) {
      switch (error.message) {
        case messages.USER_NOT_FOUND:
          return res.build.notFound(messages.USER_NOT_FOUND)
        case messages.NO_SUCH_USER:
          return res.build.notFound(messages.NO_SUCH_USER)
        default:
          return next(error)
      }
    }
  },

  async startup(req, res, next) {
    try {
      const {
        user: {
          id: userId
        }
      } = req

      return res.build.success(await userService.getStartup(userId))
    } catch (error) {
      switch (error.message) {
        default:
          return next(error)
      }
    }
  }
}