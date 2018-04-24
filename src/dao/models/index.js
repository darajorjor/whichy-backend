import User from './user.model'
import Question from './question.model'
import UserDevice from './userDevice.model'
import Device from './device.model'
import QuestionComment from './questionComment.model'
import QuestionRate from './questionRate.model'
import Transaction from './transaction.model'
import Answer from './answer.model'
import Operator from './operator.model'

User.belongsToMany(Device, { through: UserDevice, foreignKey: 'user_id', as: 'devices' })
Device.belongsToMany(User, { through: UserDevice, foreignKey: 'device_id', as: 'users' })

Answer.belongsTo(Question, { foreignKey: 'question_id', as: 'question' })
Question.hasMany(Answer, { foreignKey: 'question_id', as: 'answers' })

QuestionRate.belongsTo(Question, { foreignKey: 'question_id', as: 'question' })
Question.hasMany(QuestionRate, { foreignKey: 'question_id', as: 'rates' })

export {
  User,
  Device,
  Question,
  Answer,
  QuestionComment,
  Transaction,
  QuestionRate,
  Operator,
}
