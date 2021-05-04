import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { getProduct } from '../repositories/product.repository'
import { badRequestError } from '../helpers/httpHelper'
import { Product } from '../models'

@Route("product")
@Tags("Products")
export default class ProductController {
  @Get("/:id")
  public async getProduct(@Get() id: string): Promise<Product | null> {
    return getProduct(Number(id))
  }
}