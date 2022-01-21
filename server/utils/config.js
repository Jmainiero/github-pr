const port = process.env.port || 5000
const baseURL = "https://api.github.com/"
const gitToken = '573c9e56b0d59138acfafbc7dba8536930ed2121' //Typically I would store this in an .env file, but this'll do for now.

module.exports = { port, baseURL, gitToken }
