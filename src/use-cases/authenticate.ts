import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredencialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // buscar o usuatio no banco pelo e-mail
    // comparar se a senha no banco bate co a senha do param

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredencialsError()
    }

    // Boolean => "is" "has" "does"

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredencialsError()
    }

    return {
      user,
    }
  }
}
