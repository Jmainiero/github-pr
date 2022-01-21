const express = require('express')
const router = express.Router();
const axios = require('axios')
const { baseURL, gitToken } = require('../utils/config')


const headers = {
	headers: {
		Authorization: "token " + gitToken,
		"Content-Type": "application/json"
	}
};


router.get('/', (req, res) => {
	res.sendStatus(204) //Explciit failure 
})


router.get('*', (req, res) => res.send({ msg: 'The desired endpoint does not currently exist' }))

module.exports = router