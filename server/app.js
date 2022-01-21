const express = require('express')
app = express()
const port = process.env.port || 5000
const cors = require('cors')
const axios = require('axios')

app.use(cors())

app.listen(port, console.log(`Listening on port ${port}`))

app.get('/', (req, res) => {
	res.send({})
})
