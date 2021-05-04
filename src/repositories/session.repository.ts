import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export interface ITokenPayload {
  id: number;
  name: string;
  email: string;
}

export const getToken  = async (payload: ITokenPayload) => {
  const { id, name, email } = payload;

  return {
    user: {
      id,
      name,
      email,
    },
    token: jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }),
  };
}
