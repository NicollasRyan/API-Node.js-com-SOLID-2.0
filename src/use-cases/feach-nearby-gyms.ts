import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FecthNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}
interface FecthNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FecthNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FecthNearbyGymsUseCaseRequest): Promise<FecthNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
