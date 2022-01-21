import request from 'supertest'
const { app }  = require('../server')

describe('Lets test our project', () => {
  test("Are you returning a 200", async() => {
    const response =  await request(app).get("/")
    expect(response.statusCode).toBe(200)
  })
})