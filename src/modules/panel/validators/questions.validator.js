import Joi from 'src/utils/helpers/joi.validator'

export default {
  newQuestion: {
    body: Joi.object().keys({
      whatif: Joi.string().required(),
      but: Joi.string().required(),
    })
  }
}
