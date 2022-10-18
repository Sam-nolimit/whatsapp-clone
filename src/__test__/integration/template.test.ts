import supertest from 'supertest'
import app from '../../app'
import { MemoryServerClient } from '../../connection/mongoConnect'
import { config } from 'dotenv'

config()

const request = supertest(app)
const mem_server = new MemoryServerClient()

beforeAll(() => {
  mem_server.connectDb()
})

afterAll(() => {
  mem_server.stopDb()
})