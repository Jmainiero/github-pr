const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/app')
const { port } = require('./utils/config')

app.options('*', cors())


app.use('/', router)

//Base Server Configuration
const startServer = async () => {
    try {
        server = await app.listen(port, console.log(`Listening on port ${port}`))
    } catch (err) {
        return err;
    }
}

const closeServer = async () => {
    try {
        await server.close();
    } catch (err) {
        return err;
    }
}

if (require.main === module) {
    startServer().catch(err => console.log(err))

    closeServer().catch(err => console.log(err))
}

module.exports = { app, startServer, closeServer }