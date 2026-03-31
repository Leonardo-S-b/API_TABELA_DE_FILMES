import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

type PrismaGlobal = typeof globalThis & {
  __prisma?: PrismaClient;
};

const globalForPrisma = globalThis as PrismaGlobal;

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL não está definida. Verifique o arquivo apis/src/.env ou defina a variável de ambiente DATABASE_URL."
  );
}

const parsed = new URL(databaseUrl);
const database = parsed.pathname.replace(/^\//, "");
if (!database) {
  throw new Error(
    "DATABASE_URL inválida: faltando o nome do banco (ex: .../tabela_de_filmes)."
  );
}

const adapter = new PrismaMariaDb({
  host: parsed.hostname,
  port: parsed.port ? Number(parsed.port) : 3306,
  user: decodeURIComponent(parsed.username),
  password: decodeURIComponent(parsed.password),
  database,
  connectionLimit: 5,
});

export const prisma =
  globalForPrisma.__prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prisma = prisma;
}
