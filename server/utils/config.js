const port = process.env.port || 5000
const baseURL = "https://api.github.com"
const gitToken = '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' //Typically I would store this in an .env file, but this'll do for now. (This token will expire anyway)

module.exports = { port, baseURL, gitToken }
