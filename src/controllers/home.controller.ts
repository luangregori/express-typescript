import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { getPromos } from '../repositories/home.repository'
import { Home } from '../models'

@Route("home")
@Tags("Home")
export default class HomeController {
  @Get("/:")
  public async getPromo(): Promise<any> {
    const promos = await getPromos()
    // pesquisa em uma tabela os ids das promos e os mais vendidos
    const retun = this.mountResponseBody(promos)
    return retun
  }

  private mountResponseBody(home: Array<Home>): any  {
    function filterAndMap(type: string){
      return home.filter((value) => {
        return value.type_product === type
      })
      .map((item) => {
        return item.product
      });
    }
    let promocoes = filterAndMap('P')
    let mais_vendidos = filterAndMap('MV')

    return {promocoes, mais_vendidos}
  }
}