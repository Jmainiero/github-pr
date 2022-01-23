const port = process.env.port || 5000
const baseURL = "https://api.github.com"
const gitToken = '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' //Typically I would store this in an .env file, but this'll do for now. (This token will expire anyway)

module.exports = { port, baseURL, gitToken }
