import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchGymsUseCase } from "../search-gym"
import { CreateGymUseCase } from "../create-gym"

export function makeCreateGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CreateGymUseCase(gymsRepository)

    return useCase
}
