import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredencialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileCaseRequest {
  userId: string
}

interface GetUserProfileCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileCaseRequest): Promise<GetUserProfileCaseResponse> {
    // buscar o usuatio no banco pelo e-mail
    // comparar se a senha no banco bate co a senha do param

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
