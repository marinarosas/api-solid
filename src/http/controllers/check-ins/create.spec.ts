import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create CheckIn (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gymResponse = await prisma.gym.create({
      data: {
        title: 'JavasScript Gym',
        latitude: -5.8866705,
        longitude: -35.1818588,
      },
    })

    const responde = await request(app.server)
      .post(`/gyms/${gymResponse.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -5.8866705,
        longitude: -35.1818588,
      })

    expect(responde.statusCode).toEqual(201)
  })
})
