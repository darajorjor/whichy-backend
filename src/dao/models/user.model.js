import { Sequelize, sequelize } from 'connections/postgres'
import userAdditionalData from 'src/constants/defaults/userAdditionalData.default'
import userSettings from 'src/constants/defaults/userSettings.default'
import genderTypes from 'src/constants/enums/genderTypes.enum'
import status from 'src/constants/enums/status.enum'
import dateHelper from 'src/utils/helpers/date.helper'

const User = sequelize.define('user',
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    gender: Sequelize.ENUM(genderTypes.MALE, genderTypes.FEMALE),
    settings: {
      type: Sequelize.JSONB,
      defaultValue: userSettings,
    },
    session: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: Sequelize.ENUM(Object.values(status.USER)),
      defaultValue: status.USER.PENDING,
    },
    additional_data: {
      type: Sequelize.JSONB,
      defaultValue: userAdditionalData,
    },
    is_registered: {
      type: Sequelize.VIRTUAL,
      get: function get() { // DO NOT USE ARROW FUNCTIONS HERE!!!
        return (this.get('status') !== status.USER.PENDING)
      },
    },
    age: {
      type: Sequelize.VIRTUAL,
      get: function get() {
        return dateHelper.getAge(this.get('additional_data').birth_date)
      },
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

export default User
