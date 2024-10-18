import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private useRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.useRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPassowordMatches = await compare(password, user.password_hash);

    if (!doesPassowordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
