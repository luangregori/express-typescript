import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { filterProducts, getProduct } from '../repositories/product.repository'
import { badRequestError } from '../helpers/httpHelper'
import { Product } from '../models'

@Route("product")
@Tags("Products")
export default class ProductController {
  @Get("/:id")
  public async getProduct(@Get() id: string): Promise<Product | null> {
    const products = await getProduct(Number(id))
    if (products){
      return products
    }
    return badRequestError('invalid product')
  }

  @Post("/")
  public async filterProducts(body: any): Promise<any> {
    return filterProducts(body.filter)
  }
}