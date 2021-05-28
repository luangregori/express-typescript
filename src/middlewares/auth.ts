import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { promisify } from 'util';
import authConfig from '../config/auth';
import { getUserbyId } from '../repositories/user.repository';

export default async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization || '';
  
  if (!authHeader) {
    response.status(401).json({ error: 'Token not provided' });
  }
  
  const [, token] = authHeader.split(' ');
  
  try {
    const decoded: any = await promisify(jwt.verify)(token, authConfig.secret);
    
    const user = await getUserbyId(decoded.id);

    request.body.user = user;
    
    return next();
  } catch (error) {
    response.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
