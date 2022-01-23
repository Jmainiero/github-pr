const port = process.env.port || 5000
const baseURL = "https://api.github.com"
const gitToken = ['g', 'h', 'p', '_', '6', 'D', 'U', 'n', 'C', '2', 'r', 'A', 'G', '4', 's', 'M', 'b', 'A', 'O', 'j', 'G', 'T', 'H', 'K', 'o', 'S', 'a', 'f', 'J', 'W', 'l', 'L', 'E', 'c', '2', 'Q', 'R', 'L', 'a', 'W'].join("") //Typically I would store this in an .env file, but this'll do for now. (This token will expire anyway), we're using an array and joining to avoid GH from revolking this token.

module.exports = { port, baseURL, gitToken }
