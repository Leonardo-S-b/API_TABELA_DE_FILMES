import { Prisma, PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "../db/prisma";

export type FilmeCreateData = Prisma.FilmeCreateInput;
export type FilmeUpdateData = Prisma.FilmeUpdateInput;

export class FilmesService {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  list() {
    return this.prisma.filme.findMany({ orderBy: { id: "asc" } });
  }

  getById(id: number) {
    return this.prisma.filme.findUnique({ where: { id } });
  }

  create(data: FilmeCreateData) {
    return this.prisma.filme.create({ data });
  }

  update(id: number, data: FilmeUpdateData) {
    return this.prisma.filme.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.filme.delete({ where: { id } });
  }
}
