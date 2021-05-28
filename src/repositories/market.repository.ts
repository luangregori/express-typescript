import { getRepository } from "typeorm";
import { Market } from '../models'

export const getOnlyMarketbyId  = async (id: number): Promise<Market> => {
  const repository = getRepository(Market);

  return repository.findOneOrFail(id)
}
