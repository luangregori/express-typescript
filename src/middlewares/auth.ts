import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { promisify } from 'util';
import authConfig from '../config/auth';

export default async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization || '';
  
  if (!authHeader) {
    response.status(401).json({ error: 'Token not provided' });
  }
  
  const [, token] = authHeader.split(' ');
  
  try {
    const decoded: any = await promisify(jwt.verify)(token, authConfig.secret);
    
    request.params.userId = decoded.id;
    
    return next();
  } catch (error) {
    response.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
