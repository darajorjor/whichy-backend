import redis from 'connections/redis'
import config from 'src/config'
import { Operator } from 'models'
import messages from 'src/constants/defaults/messages.default'
import status from 'src/constants/enums/status.enum'

export default {
  async findBySession(session) {
    const key = `operator:session:${session}`
    let user = JSON.parse(await redis.get(key))
    if (user) {
      redis.expire(key, config.values.timeIntervals.sessionEx)
    } else {
      const dbUser = await Operator.findOne({ where: { session, status: { $ne: status.USER.INACTIVE } } })
      if (!dbUser) {
        throw new Error(messages.USER_NOT_FOUND)
      }

      user = {
        id: dbUser.id,
        status: dbUser.status,
      }

      redis.setex(key, config.values.timeIntervals.sessionEx, JSON.stringify(user))
    }

    return user
  }
}