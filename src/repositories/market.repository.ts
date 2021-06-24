import { getRepository } from "typeorm";
import { Market } from '../models'

export const getOnlyMarketbyId  = async (id: number): Promise<Market> => {
  const repository = getRepository(Market);

  return repository.findOneOrFail(id)
}

export const getAllMarkets  = async () :Promise<Array<Market>> => {
  const repository = getRepository(Market);

  const market = await repository
  .createQueryBuilder("market")
  .leftJoinAndSelect("market.address", "address")
  .getMany();
return market
}