import { Get, Route, Tags,  Post, Body, Delete } from "tsoa";
import * as Yup from 'yup';
import { Address, City, User } from '../models'
import { createAddress, getAddressbyUser, deleteAddress } from '../repositories/address.repository';
import { getAllCities, getOnlyCitybyId } from '../repositories/city.repository';
import { updateAddress } from "../repositories/user.repository";
import { badRequestError } from '../helpers/httpHelper'
import { IAddressPayload } from "../interface/address.interface";

@Route("address")
@Tags("Address")
export default class AddressController {

  @Get("/:id")
  public async getAddress(user: User): Promise<any> {
    const allAddress= await getAddressbyUser(user.id)

    let default_address = user.default_address ? user.default_address.id : 0;

    allAddress.map((el, idx) => {
      if(el.id === default_address){
        allAddress.splice(idx, 1);
      }
    })

    let merged = {
      default: user.default_address,
      all: allAddress
    }

    return merged
  }

  @Get("/cities")
  public async getAllCities(): Promise<Array<City>> {
    return getAllCities()
  }

  @Post("/")
  public async createAddress(@Body() body: IAddressPayload): Promise<Address> {
    const schema = Yup.object().shape({
      street: Yup.string().required(),
      number: Yup.string().required(),
      district: Yup.string().required(),
      cep: Yup.string().required(),
      complement: Yup.string(),
      city_id: Yup.number()
    });

    if (!(await schema.isValid(body))) {
      return badRequestError('Invalid argument')
    }

    const city = await getOnlyCitybyId(body.city_id);
    body.city = city

    const address = await createAddress(body)

    if(body.default){
      await updateAddress(body.user.id, address)
    }
    return address
  }

  @Delete('/')
  public async deleteAddress(body: any): Promise<any> {
    if(body.user.default_address.id === body.addressId){
      await updateAddress(body.user.id)
    }
    return deleteAddress(body.addressId)
  }
}