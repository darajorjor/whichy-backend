import status from 'src/constants/enums/status.enum'
import operatorService from 'src/modules/panel/services/operator.service'

export default async (request, response, next) => {
  try {
    let { session } = request.headers

    if (request.query.session) {
      session = request.query.session
    }
    if (!session) {
      if (request.user) {
        return next()
      }
      return response.build.unauthorized(response.messages.NO_SESSION_SUPPLIED)
    }
    const user = await operatorService.findBySession(session)
    if (!user) {
      return response.build.unauthorized(response.messages.INVALID_SESSION)
    }
    if (user.status === status.USER.SUSPENDED) {
      return response.build.forbidden(response.messages.FORBIDDEN_USER)
    }
    // if (user.status === status.USER.PENDING) {
    //   return response.build.unauthorized(response.messages.FORBIDDEN_USER)
    // }
    request.user = user
    return next()
  } catch (error) {
    switch (error.message) {
      case response.messages.USER_NOT_FOUND:
        return response.build.unauthorized(response.messages.USER_NOT_FOUND)
      default:
        return next(error)
    }
  }
}
