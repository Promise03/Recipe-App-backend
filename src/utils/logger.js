import { createLogger, format, transports } from "winston";


const logger = createLogger({
    level: "info",
    format: format.combine(format.timestamp({
        format: "DD-MM-YYYY  HH:mm:ss"
    }),
format.printf(({timestamp, level, message}) => {
return `${timestamp} [${level.toLocaleUpperCase()}]: ${message}`
})
    ),
    transports: [
        new transports.Console(), // logs message to the console
        new transports.File({filename: "logs/error.log", level: "error"}),
        new transports.File({filename: "logs/combined.log"})
    ],
});
export default logger
