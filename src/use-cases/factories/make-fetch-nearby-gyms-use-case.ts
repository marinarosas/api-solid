import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymUseCase(gymsRepository)

  return useCase
}
