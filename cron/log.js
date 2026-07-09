import pino from 'pino'

const transports = pino.transport({
  targets: [{
    target: 'pino-axiom',
    options: {
      orgId: import.meta.env.VITE_AXIOM_ORG_ID, // Can be found on settings page
      token: import.meta.env.VITE_AXIOM_TOKEN, // Can be created on settings page
      dataset: import.meta.env.VITE_AXIOM_DATASET, // Can be created on settings page
    },
  }, {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
    },
  }],
})

const logger = pino(transports)

const traceId
  = Math
    .random()
    .toString(36)
    .substring(2, 15)
    + Math
      .random()
      .toString(36)
      .substring(2, 15)

export function log(message, payload) {
  logger.info(message, {
    traceId,
    ...payload,
  })
}

export function grupo(grupo) {
  return logger.child({
    traceId,
    ...grupo,
  })
}

export function logError(grupo, error, context) {
  grupo.error({
    msg: 'Error',
    errorMessage: error.message,
    errorStack: error.stack,
    ...context,
  })
}
