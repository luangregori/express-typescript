import { getRepository } from "typeorm";
import { Home } from '../models'

export const getPromos  = async () :Promise<Array<Home>> => {
  const repository = getRepository(Home);

  return repository.find({relations: ['product']});
}
