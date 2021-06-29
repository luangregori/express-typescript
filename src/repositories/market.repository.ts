import { getRepository, getManager } from "typeorm";
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

export const getProductsInAMarket  = async (marketId: number): Promise<any> => {
  const entityManager = getManager();
  const someQuery = await entityManager.query(`
    SELECT p.id as id, p.name, p.description, p.url_photo, pm.price, pm.old_price, pm.discount
      FROM product_market pm
      JOIN product p ON pm.product_id = p.id
      WHERE pm.market_id = ${marketId};`);
  return someQuery
}