import { Get, Route, Tags } from "tsoa";
import { getAllMarkets, getOnlyMarketbyId, getProductsInAMarket } from "../repositories/market.repository";

@Route("market")
@Tags("Market")
export default class MarketController {
  @Get("/")
  public async getMarkets(): Promise<any> {
    return getAllMarkets()
  }

  @Get("/:id")
  public async getProductsInAMarket(marketId: string): Promise<any> {
    return getProductsInAMarket(Number(marketId))
  }
}