import { Prisma } from "@prisma/client";
import type { Request, Response } from "express";
import { FilmesService } from "../services/filmesService";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function getFirst(body: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(body, key)) return body[key];
  }
  return undefined;
}

function readNonEmptyString(body: Record<string, unknown>, keys: string[]): string | undefined {
  const value = getFirst(body, keys);
  if (value === undefined) return undefined;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function readNumber(body: Record<string, unknown>, keys: string[]): number | undefined {
  const value = getFirst(body, keys);
  if (value === undefined) return undefined;

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  }

  return undefined;
}

function parseId(value: string): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export class FilmesController {
  constructor(private readonly service = new FilmesService()) {}

  list = async (_req: Request, res: Response) => {
    try {
      const filmes = await this.service.list();
      return res.status(200).json(filmes);
    } catch (error) {
      return res.status(500).json({ message: "internal error", error });
    }
  };

  getById = async (req: Request<{ id: string }>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: "invalid id" });

    try {
      const filme = await this.service.getById(id);
      if (!filme) return res.status(404).json({ message: "filme not found" });
      return res.status(200).json(filme);
    } catch (error) {
      return res.status(500).json({ message: "internal error", error });
    }
  };

  create = async (req: Request, res: Response) => {
    if (!isRecord(req.body)) {
      return res.status(400).json({
        message: "invalid request body",
        hint: "Use JSON body with Content-Type: application/json",
      });
    }

    const body = req.body;
    const title = readNonEmptyString(body, ["title", "titulo"]);
    const director = readNonEmptyString(body, ["director", "diretor"]);
    const releaseYearRaw = readNumber(body, ["releaseYear", "ano"]);
    const genre = readNonEmptyString(body, ["genre", "genero"]);
    const ratingRaw = readNumber(body, ["rating", "nota"]);
    const synopsis = readNonEmptyString(body, ["synopsis", "sinopse"]);

    if (!title || !director || releaseYearRaw === undefined || !genre || ratingRaw === undefined || !synopsis) {
      return res.status(400).json({
        message: "missing or invalid required fields",
        required: ["title", "director", "releaseYear", "genre", "rating", "synopsis"],
      });
    }

    const releaseYear = Math.trunc(releaseYearRaw);
    if (!Number.isInteger(releaseYearRaw) || releaseYear <= 0) {
      return res.status(400).json({ message: "invalid releaseYear" });
    }

    const rating = ratingRaw;

    try {
      const novoFilme = await this.service.create({
        title,
        director,
        releaseYear,
        genre,
        rating,
        synopsis,
      });

      return res.status(201).json(novoFilme);
    } catch (error) {
      return res.status(500).json({ message: "internal error", error });
    }
  };

  update = async (req: Request<{ id: string }>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: "invalid id" });

    if (!isRecord(req.body)) {
      return res.status(400).json({
        message: "invalid request body",
        hint: "Use JSON body with Content-Type: application/json",
      });
    }

    const body = req.body;
    const title = readNonEmptyString(body, ["title", "titulo"]);
    const director = readNonEmptyString(body, ["director", "diretor"]);
    const releaseYearRaw = readNumber(body, ["releaseYear", "ano"]);
    const genre = readNonEmptyString(body, ["genre", "genero"]);
    const rating = readNumber(body, ["rating", "nota"]);
    const synopsis = readNonEmptyString(body, ["synopsis", "sinopse"]);

    const data: Prisma.FilmeUpdateInput = {};
    if (title !== undefined) data.title = title;
    if (director !== undefined) data.director = director;
    if (genre !== undefined) data.genre = genre;
    if (rating !== undefined) data.rating = rating;
    if (synopsis !== undefined) data.synopsis = synopsis;

    if (releaseYearRaw !== undefined) {
      const releaseYear = Math.trunc(releaseYearRaw);
      if (!Number.isInteger(releaseYearRaw) || releaseYear <= 0) {
        return res.status(400).json({ message: "invalid releaseYear" });
      }
      data.releaseYear = releaseYear;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "no valid fields to update",
        allowed: ["title", "director", "releaseYear", "genre", "rating", "synopsis"],
      });
    }

    try {
      const filmeAtualizado = await this.service.update(id, data);
      return res.status(200).json(filmeAtualizado);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return res.status(404).json({ message: "filme not found" });
      }
      return res.status(500).json({ message: "internal error", error });
    }
  };

  remove = async (req: Request<{ id: string }>, res: Response) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: "invalid id" });

    try {
      const filmeRemovido = await this.service.delete(id);
      return res.status(200).json({ message: "filme deleted", filme: filmeRemovido });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return res.status(404).json({ message: "filme not found" });
      }
      return res.status(500).json({ message: "internal error", error });
    }
  };
}
