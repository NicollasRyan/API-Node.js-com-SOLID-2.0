import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-existes-erro";

// eslint-disable-next-line new-cap
let usersRepository: inMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  it("Should be able to register", async () => {
    beforeEach(() => {
      // eslint-disable-next-line new-cap
      usersRepository = new inMemoryUsersRepository();
      sut = new RegisterUseCase(usersRepository);
    });
    const { user } = await sut.execute({
      name: "John Doe",
      email: "jonhdoe@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "jonhdoe@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should not be able to register with same email twice", async () => {
    const email = "jonhdoe@gmail.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
