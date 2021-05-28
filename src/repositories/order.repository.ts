import { getRepository } from "typeorm";
import { Order } from '../models';

export const getOrderbyId  = async (id: number): Promise<Order | null> => {
  const repository = getRepository(Order);
  const order = await repository.findOne(id)
  if (!order) return null
  return order
}

export const getOrderbyUser  = async (userId: number): Promise<Array<Order>> => {
  const repository = getRepository(Order);
  const orders = await repository
    .createQueryBuilder("order")
    .leftJoinAndSelect("order.user", "user")
    .leftJoinAndSelect("order.market", "market")
    .leftJoinAndSelect("order.address", "address")
    .where(`user.id = ${userId}`)
    .getMany();
  return orders
}

export const createOrder  = async (payload: any): Promise<Order> => {
  const repository = getRepository(Order);
  const order = new Order()

  return repository.save({
    ...order,
    ...payload
  })
}

