import { getRepository } from "typeorm";
import { Address } from '../models'

export const getOnlyAddressbyId  = async (id: number): Promise<Address> => {
  const repository = getRepository(Address);

  return repository.findOneOrFail(id)
}
