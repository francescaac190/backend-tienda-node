import 'dotenv/config';
import { PrismaClient } from '../generated/client'; 
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

if (!process.env.DATABASE_URL) {
  // Esto te ayuda a detectar si olvidaste el env
  throw new Error('DATABASE_URL no está definida en el archivo .env');
}

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

// Puedes exportarlo de las dos formas:
export const prisma = new PrismaClient({
  adapter,
  log: ['query', 'error', 'warn'], // opcional, pero útil en dev
});

export default prisma;
