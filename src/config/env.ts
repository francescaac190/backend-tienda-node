import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

 if (!process.env.JWT_SECRET) {
  console.warn(
    '⚠️ JWT_SECRET no definido en .env, usando valor por defecto (solo para desarrollo)'
  );
}

// Aquí tipamos explícitamente como Secret (string es válido)
export const JWT_SECRET: Secret = process.env.JWT_SECRET || 'dev_fac9120';

// Puede ser string o number (por ejemplo '1d' o 3600)
export const JWT_EXPIRES_IN: string | number =
  process.env.JWT_EXPIRES_IN || '1d';