import request from 'supertest'
const { app, startServer, closeServer }  = require('../server')
const { grabRepoPulls, grabPullCommits} = require('../services/services')
const { prData, pullRequest } = require('./testData')

describe('Lets test our project', () => {
  jest.setTimeout(60000)
  beforeAll(() => {
    return startServer();
  })

  //Repo for testing: https://github.com/sindresorhus/awesome
  test("Should return data & 200", async() => {
    const response = await request(app).post("/queryRepository").query({
      owner: 'sindresorhus',
      repo: 'awesome'
    }).set('Origin', 'http://localhost:3000') //set origin to pass cors

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()
    
    //Check response for proper keys
    expect(response.body[0]).toEqual(expect.objectContaining({
      title: expect.any(String),
      pull: expect.any(Number),
      author: expect.any(String),
      authPage: expect.any(String),
      avatar: expect.any(String),
      url: expect.any(String),
      commitCount: expect.any(Number)
    }))
  })

  test("Additional Endpoint should return 200", async () => {
    const response = await request(app).post("/queryPullRequests").query({
      owner: 'colinhacks',
      repo: 'zod'
    }).set('Origin', 'http://localhost:3000') //set origin to pass cors

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toBeDefined()

    expect(response.body[0]).toEqual(pullRequest[0])
  })

  test('grabRepoPulls: Should return PR', async() => {
    const response = await grabRepoPulls('sindresorhus', 'awesome')
    expect(response).toBeDefined()
    expect(response.length).toBeGreaterThan(0)
    expect(Array.isArray(response)).toBe(true)
  })

  test('grabRepoPulls: Should return PR Commits', async() => {
    const response = await grabPullCommits('sindresorhus', 'awesome', 2084) //Hardcoding a PR with >1 for testing purposes
    expect(response).toBeDefined()
    expect(typeof response).toBe('number')
    expect(response).toBeGreaterThan(1)
  })

  afterAll( done => {
    // Closing the DB connection allows Jest to exit successfully.
    closeServer()
    done()
  })
})