import { getRepository } from "typeorm";
import { Address } from '../models'

export const getOnlyAddressbyId  = async (id: number): Promise<Address> => {
  const repository = getRepository(Address);

  return repository.findOneOrFail(id)
}

export const getAddressbyUser  = async (userId: number): Promise<Array<Address>> => {
  const repository = getRepository(Address);
  const address = await repository
    .createQueryBuilder("address")
    .leftJoinAndSelect("address.user", "user")
    .where(`user.id = ${userId}`)
    .getMany();
  return address
}

export const createAddress  = async (payload: any): Promise<Address> => {
  const repository = getRepository(Address);
  const address = new Address()

  return repository.save({
    ...address,
    ...payload
  })
}

export const deleteAddress  = async (id: number): Promise<any> => {
  const repository = getRepository(Address);
  return await repository.delete(id);
}
