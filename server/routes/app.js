const express = require('express')
const router = express.Router();
const { grabRepoPulls, grabPullCommits } = require('../services/services')

router.post('/queryRepository', async (req, res) => {
	try {
		const { owner, repo } = req.query
		if (!owner || !repo) throw res.status(400).send({ msg: 'Invalid Owner or Repo. Please Try Again' })

		const r = []
		const pulls = await grabRepoPulls(owner, repo)

		for (const pull of pulls) {
			const commitCount = await grabPullCommits(owner, repo, pull.number)
			r.push({ title: pull.title, pull: pull.number, author: pull.user.login, authPage: pull.user.html_url, avatar: pull.user.avatar_url ,url: pull.html_url, commitCount: commitCount })
		}
		console.log('Successfully got repo data')
		return res.status(200).json(r)
	} catch (e) {
		throw res.end(e)
	}
})


router.get('*', (req, res) => res.send({ msg: 'The desired endpoint does not currently exist' }))

module.exports = router