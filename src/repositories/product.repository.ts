import { getRepository } from "typeorm";
import { Category, Product } from '../models'

export const getProduct  = async (id: number): Promise<Product | null> => {
  const productRepository = getRepository(Product);

  const product = await productRepository.findOne(id)

  if (!product) return null
  return product
}

export const getProductsInACategory  = async (id: number): Promise<Array<Product>> => {
  const userRepository = getRepository(Product);

  return userRepository
    .createQueryBuilder("product")
    .innerJoin("product.category", "category")
    .where(`category.id = ${id}`)
    .getMany();
}