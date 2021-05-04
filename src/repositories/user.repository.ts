import bcrypt from 'bcryptjs';
import { getRepository } from "typeorm";
import { User, Product } from '../models'

export interface IUserPayload {
  name: string;
  email: string;
  password: string;
  password_hash: string;
}

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

export const getUserbyEmail  = async (email: string) :Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email })
  if (!user) return null
  return user
}

export const login = async (email: string, password: string) :Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email })
  if (!user) return null
  return user
}

export const getPasswordHash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 8);
}

export const checkPassword = async (password: string, password_hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, password_hash);
}
