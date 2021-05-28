import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import * as Yup from 'yup';
import { Product, Order } from '../models'
import { getOnlyProductbyId } from '../repositories/product.repository';
import { getOnlyMarketbyId } from '../repositories/market.repository';
import { getOnlyAddressbyId } from '../repositories/address.repository';
import { createOrder, getOrderbyUser } from '../repositories/order.repository';
import { badRequestError } from '../helpers/httpHelper'
import { IOrderPayload } from '../interface/order.interface';


@Route("users")
@Tags("User")
export default class OrderController {

  @Get("/")
  public async getOrders(id: number): Promise<Array<Order>> {
    return getOrderbyUser(id)
  }

  @Post("/")
  public async createOrder(@Body() body: IOrderPayload): Promise<Order> {
    const schema = Yup.object().shape({
      productsIds: Yup.array().required(),
      marketId: Yup.number().required(),
      addressId: Yup.number().required()
    });

    if (!(await schema.isValid(body))) {
      return badRequestError('Invalid argument')
    }

    const market = await getOnlyMarketbyId(body.marketId);
    const address = await getOnlyAddressbyId(body.addressId);

    let total_value: number = 0;
    const products: Array<Product> = await Promise.all(
      body.productsIds.map(async el =>{
        const product = await getOnlyProductbyId(el);
        total_value += product.price
        return product
      })
    )

    const newOrder = {
      products,
      total_value,
      market,
      address,
      user: body.user,
      status: 'created'
    }

    const order = await createOrder(newOrder)
    return order
  }
}