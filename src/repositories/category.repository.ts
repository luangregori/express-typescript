import { getRepository } from "typeorm";
import { Category, Product } from '../models'

export const getCategories  = async () :Promise<Array<Category>> => {
  const repository = getRepository(Category);

  return repository.find();
}

export const getProductsInACategory  = async (id: number): Promise<Array<Product>> => {
  const userRepository = getRepository(Product);

  return userRepository
    .createQueryBuilder("product")
    .innerJoin("product.category", "category")
    .where(`category.id = ${id}`)
    .getMany();
}