import { FastifyInstance } from 'fastify'
import { register } from './Controllers/register'
import { authenticate } from './Controllers/authenticate'
import { profile } from './Controllers/profile'
import { verifyJwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
