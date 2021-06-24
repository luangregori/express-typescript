import { Get, Route, Tags } from "tsoa";
import { getPromos } from '../repositories/home.repository'
import { Home, ProductMarket } from '../models'
import { getOnlyPriceByMarket } from "../repositories/product.repository";
import { getAllMarkets, getOnlyMarketbyId } from "../repositories/market.repository";

@Route("market")
@Tags("Market")
export default class MarketController {
  @Get("/")
  public async getMarkets(): Promise<any> {
    return getAllMarkets()
  }
}