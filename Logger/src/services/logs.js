const { createLogger, format, transports, addColors } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.json()
  ),
  transports: [
    new transports.File({
      level: "error",
      maxsize: 5120000,
      maxFiles: 25,
      filename: `${__dirname}/../../logs/error.log`,
    }),
    new transports.File({
      level: "info",
      maxsize: 5120000,
      maxFiles: 15,
      filename: `${__dirname}/../../logs/info.log`,
    }),
    new transports.File({
      level: "debug",
      maxsize: 5120000,
      maxFiles: 15,
      filename: `${__dirname}/../../logs/debug.log`,
    }),
    new transports.File({
      level: "warn",
      maxsize: 5120000,
      maxFiles: 15,
      filename: `${__dirname}/../../logs/warn.log`,
    }),
    new transports.File({
      level: "verbose",
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../../logs/verbose.log`,
    }),
    new transports.File({
      level: "http",
      maxsize: 5120000,
      maxFiles: 25,
      filename: `${__dirname}/../../logs/http.log`,
    }),
  ],
});

logger.add(
    new transports.Console({
        format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(
            (info) =>
            `[${info.timestamp}] ${info.level.toLocaleUpperCase()} - ${
                info.message
            }`
        ),
        format.colorize({
            all: true,
        })
        ),
        level: "debug",
    })
);

module.exports = logger;
