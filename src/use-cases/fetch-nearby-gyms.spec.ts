import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FecthNearbyGymsUseCase } from "./feach-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FecthNearbyGymsUseCase;
describe("Feach Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FecthNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to featch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -9.3964171,
      longitude: -40.4967938,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
