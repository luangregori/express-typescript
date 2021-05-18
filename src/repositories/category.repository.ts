import { getRepository } from "typeorm";
import { Category, Product } from '../models'

export const getCategories  = async () :Promise<Array<Category>> => {
  const repository = getRepository(Category);

  return repository.find();
}
