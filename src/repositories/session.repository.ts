import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import { ITokenPayload, TokenJWT } from '../interface/token.interface'

export const getToken  = async (payload: ITokenPayload): Promise<TokenJWT> => {
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
