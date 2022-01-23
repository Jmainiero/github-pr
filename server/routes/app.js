const express = require('express')
const router = express.Router()
const { grabRepoPulls, grabPullCommits } = require('../services/services')

router.post('/queryRepository', async (req, res) => {
	try {
		const { owner, repo } = req.query
		if (!owner || !repo) return res.status(400).send({ msg: 'Invalid Owner or Repo. Please Try Again' })

		const r = []
		const pulls = await grabRepoPulls(owner, repo) //Pull our repo

		//Get # of commits per PR and build our master dataset for client
		for (const pull of pulls) {
			const commitCount = await grabPullCommits(owner, repo, pull.number)
			r.push({ title: pull.title, pull: pull.number, author: pull.user.login, authPage: pull.user.html_url, avatar: pull.user.avatar_url, url: pull.html_url, commitCount: commitCount, createdDate: new Date(pull.created_at).toLocaleDateString() })
		}
		return res.status(200).json(r)
	} catch (e) {
		return res.end(e)
	}
})

router.post('/queryCommitCounts', async (req, res) => {
	try {
		const { owner, repo, pull } = req.query
		if (!owner || !repo || !pull) return res.status(400).send({ msg: 'Invalid Owner or Repo. Please Try Again' })

		const commitCount = await grabPullCommits(owner, repo, pull)
		return res.status(200).json(commitCount)
	} catch (e) {
		return res.end(e)
	}
})

router.post('/queryPullRequests', async (req, res) => {
	try {
		const { owner, repo } = req.query
		if (!owner || !repo) return res.status(400).send({ msg: 'Invalid Owner or Repo. Please Try Again' })

		const pulls = await grabRepoPulls(owner, repo) //Pull our repo

		return res.status(200).json(pulls)
	} catch (e) {
		return res.end(e)
	}
})


router.get('*', (req, res) => res.send({ msg: 'The desired endpoint does not currently exist' }))

module.exports = router