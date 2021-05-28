import { getRepository } from "typeorm";
import { Product } from '../models'

export const getProduct  = async (id: number): Promise<Product> => {
  const repository = getRepository(Product);

  return repository
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.markets", "market") 
    .where(`product.id = ${id}`)
    .getRawOne();
}

export const getOnlyProductbyId  = async (id: number): Promise<Product> => {
  const repository = getRepository(Product);

  return repository.findOneOrFail(id)
}

export const getProductsInACategory  = async (id: number): Promise<Array<Product>> => {
  const repository = getRepository(Product);

  return repository
    .createQueryBuilder("product")
    .innerJoin("product.category", "category")
    .where(`category.id = ${id}`)
    .getMany();
}