export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Email already exist')
  }
}
