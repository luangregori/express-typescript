import { getRepository, getManager  } from "typeorm";
import { Product, ProductMarket } from '../models'

export const getProduct  = async (id: number): Promise<any> => {
  const repository = getRepository(Product);
  const entityManager = getManager();

  const someQuery = await entityManager.query(`
  SELECT m.id, m.name, pm.price, pm.old_price, pm.discount
    FROM product_market pm
    JOIN market m ON pm.market_id = m.id
    WHERE pm.product_id = ${id};`);
    
  const product = await repository
    .createQueryBuilder("product")
    .where(`product.id = ${id}`)
    .getOne();

  if (!product) return null
  product.productMarket = someQuery
  return product
}

export const getOnlyProductbyId  = async (id: number): Promise<Product> => {
  const repository = getRepository(Product);

  return repository.findOneOrFail(id)
}

export const getOnlyPriceByMarket  = async (productId: number, marketId: number): Promise<any> => {
  const entityManager = getManager();
  const someQuery = await entityManager.query(`
  SELECT pm.price
    FROM product_market pm
   	JOIN product p ON pm.product_id = p.id
    WHERE pm.product_id = ${productId} AND pm.market_id = ${marketId};`);
  return someQuery[0].price
}

export const getProductsInACategory  = async (id: number): Promise<Array<any>> => {
  // const repository = getRepository(Product);

  // return repository
  //   .createQueryBuilder("product")
  //   .innerJoin("product.category", "category")
  //   .where(`category.id = ${id}`)
  //   .getMany();

  const entityManager = getManager();
  const someQuery = await entityManager.query(`
  SELECT p.id as id, p.name, p.description, p.url_photo, t.price, pm.old_price, pm.discount
    FROM (
      SELECT product_id, MIN(price) as price
      FROM product_market
      GROUP BY product_id
      ) t 
    JOIN product_market pm ON pm.product_id = t.product_id AND t.price = pm.price
    JOIN product p ON pm.product_id = p.id
    WHERE p.category_id = ${id};`);
  return someQuery
}

export const filterProducts  = async (filter: string): Promise<Array<any>> => {
  const entityManager = getManager();
  const someQuery = await entityManager.query(`
  SELECT p.id as id, p.name, p.description, p.url_photo, pm.price, pm.old_price, pm.discount
		FROM product_market pm
    JOIN product p ON pm.product_id = p.id
    WHERE p.name LIKE '%${filter}%';`);
  return someQuery
}