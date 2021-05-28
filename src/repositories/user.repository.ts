import bcrypt from 'bcryptjs';
import { getRepository } from "typeorm";
import { User, Product } from '../models';
import { IUserPayload } from '../interface/user.interface';

export const getUsers  = async () :Promise<Array<User>> => {
  const userRepository = getRepository(User);

  return userRepository.find()
}

export const createUser  = async (payload: IUserPayload) :Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User()

  payload.password_hash = await getPasswordHash(payload.password)
  return userRepository.save({
    ...user,
    ...payload
  })
}

export const getUserbyId  = async (id: number): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id)
  if (!user) return null
  return user
}

export const getUserbyEmail  = async (email: string) :Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email })
  if (!user) return null
  return user
}

export const getPasswordHash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 8);
}

export const checkPassword = async (password: string, id: number): Promise<boolean> => {
  const userRepository = getRepository(User);
  const user = await userRepository
    .createQueryBuilder('user')
    .addSelect("user.password_hash")
    .where(`user.id = ${id}`)
    .getRawOne();
  return await bcrypt.compare(password, user.password_hash);
}
