import { getRepository } from "typeorm";
import { Card } from '../models'

export const getOnlyACardbyId  = async (id: number): Promise<Card> => {
  const repository = getRepository(Card);

  return repository.findOneOrFail(id)
}

export const getCardbyUser  = async (userId: number): Promise<Array<Card>> => {
  const repository = getRepository(Card);
  const cards = await repository
    .createQueryBuilder("card")
    .leftJoinAndSelect("card.user", "user")
    .where(`user.id = ${userId}`)
    .getMany();
  return cards
}

export const createCard  = async (payload: any): Promise<Card> => {
  const repository = getRepository(Card);
  const card = new Card()

  return repository.save({
    ...card,
    ...payload
  })
}

export const deleteCard  = async (id: number): Promise<any> => {
  const repository = getRepository(Card);
  return await repository.delete(id);
}
