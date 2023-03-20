const status = process.env.LOGGER ? process.env.LOGGER.trim().toLowerCase() : "";
module.exports = {
    debug: (...args) => status === "debug" ? console.debug(...args) : null,
    info: (...args) => console.info(...args),
    error: (...args) => console.error(...args)
}