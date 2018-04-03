// import UserRepository from 'repositories/user.repository'
import messages from 'src/constants/defaults/messages.default'
import status from 'src/constants/enums/status.enum'
import uuid from 'uuid/v4'
import redis from 'connections/redis'
import config from 'src/config'
import { User, Device } from 'models'
import gameService from 'src/modules/games/services/games.service'
import accountingService from 'src/modules/accounting/services/accounting.service'

const UserRepository = {}

export default {
  /*async getUser(id, selfId) {
   let user = await UserRepository.findById(id)

   if (!user) throw new Error(messages.USER_NOT_FOUND)

   user = user.toObject()

   if (user.friends.find(i => i.toString() === selfId)) {
   user.isFriend = true
   }

   return user
   },

   async getSelfUser(id) {
   let user = await UserRepository.findById(id)
   .populate('friends')
   .populate('friendRequests.user')

   if (!user) throw new Error(messages.USER_NOT_FOUND)
   const coins = user.getCoins()
   user = user.toObject()

   user.coins = coins
   user.friendRequests = user.friendRequests.filter((fr) => fr.requestType === friendRequestTypes.RECEIVED && fr.status === 'PENDING')
   user.friends = user.friends.map(fr => {
   fr.isFriend = true

   return fr
   })

   return user
   },

   async update(id, data) {
   if (data.referrer) {
   // check referrer
   await this.applyReferrer(data.referrer, id)
   }

   let user = await UserRepository.findOneAndUpdate(id, data)
   //   .populate('friends')
   //   .populate('friendRequests.user')
   //
   // const coins = user.getCoins()
   // user = user.toObject()
   //
   // user.coins = coins
   // user.friendRequests = user.friendRequests.filter((fr) => fr.requestType === friendRequestTypes.RECEIVED && fr.status === 'PENDING')
   // user.friends = user.friends.map(fr => {
   //   fr.isFriend = true
   //
   //   return fr
   // })

   return user

   async applyReferrer(referrerUsername, referredUserId) {
   const user = await UserRepository.findById(referredUserId)
   if (user.username === referrerUsername) {
   throw new Error(messages.YOU_CANNOT_INVITE_YOURSELF)
   }

   const referrer = await UserRepository.findOne({ username: new RegExp(referrerUsername, 'i') })

   if (!referrer) throw new Error(messages.NO_SUCH_USER)

   await referrer.addTransaction({
   type: coinTransactionTypes.REFERRAL,
   amount: config.prices.referrerGift,
   recordId: referredUserId,
   })
   referrer.friends.push(user._id)
   await referrer.save()
   await user.addTransaction({
   type: coinTransactionTypes.REFERRAL,
   amount: config.prices.referredUserGift,
   recordId: referrer._id,
   })
   user.friends.push(referrer._id)
   await user.save()

   return true
   },

   },*/

  async registerGoogleUser(gData) {
    let user = await UserRepository.findByGoogleId(gData.id)

    let data = {}
    data.fullName = gData.displayName
    if (!user) {
      data.username = await this.generateUsername(gData.name.givenName, gData.name.familyName)
    }
    data.firstName = gData.name.givenName
    data.lastName = gData.name.familyName
    data.avatar = gData.image.url
    data.oauth = {
      google: gData
    }

    if (!user) {
      return UserRepository.registerUser(data)
    }

    const updatedUser = await UserRepository.findOneAndUpdate({ _id: user._id }, data)

    return {
      ...updatedUser.toObject(),
      isRegistered: true,
    }
  },

  async generateUsername(firstName, lastName) {
    let username = `${firstName}${lastName ? lastName.split(' ')[0] : ''}${Math.floor((Math.random() * 9999) + 1)}`
    let userWithSameUsername = await UserRepository.findOne({ username })

    while (userWithSameUsername) {
      username = `${firstName}${lastName ? lastName.split(' ')[0] : ''}${Math.floor((Math.random() * 9999) + 1)}`
      userWithSameUsername = await UserRepository.findOne({ username })
    }

    return username
  },

  async registerUser(device) {
    const savedUser = await User.create({
      session: uuid(),
    })
    await savedUser.addDevice(device, { through: { status: status.USER_DEVICE.ACTIVE } })
    const key = `user:session:${savedUser.session}`
    const whatifStats = await gameService.getUserWhatifStats(savedUser.id)

    redis.setex(key, config.values.timeIntervals.sessionEx, JSON.stringify({
        id: savedUser.id,
        status: savedUser.status,
        stats: {
          whatif: {
            questionsAnswered: whatifStats.questionsAnswered,
            level: whatifStats.level,
            levelQuestions: whatifStats.levelQuestions,
          },
        },
      }
    ))
    return savedUser
  },

  async findBySession(session) {
    const key = `user:session:${session}`
    let user = JSON.parse(await redis.get(key))
    if (user) {
      redis.expire(key, config.values.timeIntervals.sessionEx)
    } else {
      const dbUser = await User.findOne({ where: { session, status: { $ne: status.USER.INACTIVE } } })
      if (!dbUser) {
        throw new Error(messages.USER_NOT_FOUND)
      }

      user = {
        id: dbUser.id,
        status: dbUser.status,
      }

      redis.setex(key, config.values.timeIntervals.sessionEx, JSON.stringify(user))
    }

    const whatifStats = await gameService.getUserWhatifStats(user.id)
    user.stats = {
      whatif: {
        questionsAnswered: whatifStats.questionsAnswered,
        level: whatifStats.level,
        levelQuestions: whatifStats.levelQuestions,
      },
    }

    return user
  },

  async findByDeviceToken(token) {
    const devices = await Device.findAll({
      where: {
        token,
      },
      include: [
        {
          required: true,
          model: User,
          as: 'users',
        },
      ],
      raw: true,
    })

    // TODO take care!
    return devices[0]['users.session']
  },

  async getStartup(userId) {
    // const user = User.findById(userId)

    return {
      balance: await accountingService.getBalance(userId)
    }
  },
}
