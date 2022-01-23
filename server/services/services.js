const axios = require('axios')
const { baseURL, gitToken } = require('../utils/config')

const headers = {
    headers: {
        Authorization: "token " + gitToken,
        "Content-Type": "application/json"
    }
};

const grabRepoPulls = async (owner, repo) => {
    try {
        const query = await axios({
            method: "GET",
            headers: headers.headers,
            url: `${baseURL}/repos/${owner}/${repo}/pulls?state=open&per_page=100` //Only get open PR and return max # of results
        })
        return query.data
    } catch (e) {
        return e
    }
}

const grabPullCommits = async (owner, repo, number) => {
    try {
        const query = await axios({
            method: "GET",
            headers: headers.headers,
            url: `${baseURL}/repos/${owner}/${repo}/pulls/${number}/commits`
        });
        return query.data.length
    } catch (e) {
        return e
    }
}



module.exports = { grabRepoPulls, grabPullCommits }