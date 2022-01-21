import request from 'supertest'
const { app, startServer, closeServer }  = require('../server')

describe('Lets test our project', () => {
  beforeAll(() => {
    return startServer();
  })

  test("Are you returning a 200", async() => {
    const response =  await request(app).get("/")
    expect(response.statusCode).toBe(204)
  })


  afterAll( done => {
    // Closing the DB connection allows Jest to exit successfully.
    closeServer()
    done()
  })
})