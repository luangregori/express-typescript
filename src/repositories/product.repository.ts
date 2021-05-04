import { getRepository } from "typeorm";
import { Category, Product } from '../models'

export const getProduct  = async (id: number): Promise<Product | null> => {
  const productRepository = getRepository(Product);

  const product = await productRepository.findOne(id)

  if (!product) return null
  return product
}
