import request from 'supertest'
const { app, startServer, closeServer }  = require('../server')
const { grabRepoPulls, grabPullCommits} = require('../services/services')
const { prData } = require('./testData')

describe('Lets test our project', () => {
  jest.setTimeout(60000)
  beforeAll(() => {
    return startServer();
  })

  test("Should return data & 200", async() => {
    const response = await request(app).post("/queryRepository").query({
      owner: 'colinhacks',
      repo: 'zod'
    }).set('Origin', 'http://localhost:3000') //set origin to pass cors

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    expect(response.body.data).toBeDefined()
    expect(response.body.data[0]).toMatchObject(prData[0])
  })

  test('grabRepoPulls: Should return PR', async() => {
    const response = await grabRepoPulls('colinhacks', 'zod')
    expect(response).toBeDefined()
    expect(response.length).toBeGreaterThan(0)
    expect(Array.isArray(response)).toBe(true)
  })

  test('grabRepoPulls: Should return PR Commits', async() => {
    const response = await grabPullCommits('colinhacks', 'zod', 851) //Hardcoding a PR with >1 for testing purposes
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