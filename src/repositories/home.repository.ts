import { getManager } from "typeorm";
import { Home } from '../models'

export const getPromos  = async () :Promise<Array<Home>> => {
  const entityManager = getManager();
  const someQuery = await entityManager.query(`
  SELECT p.id as product_id, ho.type_product, p.name, p.description, p.url_photo, pm.price, pm.old_price, pm.discount
    FROM home ho
   	JOIN product p ON ho.product_id = p.id
    JOIN product_market pm ON ho.product_market_id = pm.id;`);
  return someQuery
}
