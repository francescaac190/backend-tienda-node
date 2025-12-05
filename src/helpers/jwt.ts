import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env';
import { User } from '../models/user.model';

export interface JwtPayload {
  userId: number;
  role: string;
}

export const signToken = (user: User): string => {
  const payload: JwtPayload = {
    userId: user.id,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'],
  });
};
