import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { getCategories, getProductsInACategory } from '../repositories/category.repository'
import { badRequestError } from '../helpers/httpHelper'
import { Category, Product } from '../models'

@Route("category")
@Tags("Category")
export default class CategoryController {
  @Get("/")
  public async getCategories(): Promise<Array<Category>> {
    return getCategories()
  }

  @Get("/:id")
  public async getProductsInACategory(@Get() id: string):  Promise<Array<Product>> {
    return getProductsInACategory(Number(id))
  }
}