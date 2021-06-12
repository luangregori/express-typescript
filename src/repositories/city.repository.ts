import { getRepository } from "typeorm";
import { City } from '../models'

export const getAllCities  = async (): Promise<Array<City>> => {
  const repository = getRepository(City);

  return repository.find()
}

export const getOnlyCitybyId  = async (id: number): Promise<City> => {
  const repository = getRepository(City);

  return repository.findOneOrFail(id)
}