import { Router } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma";

const router = Router();

function parseId(value: string): number | null {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

router.get("/", async (req, res) => {
    try {
        const filmes = await prisma.filme.findMany({ orderBy: { id: "asc" } });
        return res.status(200).json(filmes);
    } catch (error) {
        return res.status(500).json({ message: "internal error", error });
    }
});

router.get("/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: "invalid id" });

    try {
        const filme = await prisma.filme.findUnique({ where: { id } });
        if (!filme) return res.status(404).json({ message: "filme not found" });
        return res.status(200).json(filme);
    } catch (error) {
        return res.status(500).json({ message: "internal error", error });
    }
});

router.post("/", async (req, res) => {
    if (!req.body || typeof req.body !== "object") {
        return res.status(400).json({
            message: "invalid request body",
            hint: "Use JSON body with Content-Type: application/json",
        });
    }

    const { title, director, releaseYear, genre, rating, synopsis } = req.body;

    if (!title || !director || !releaseYear || !genre || rating === undefined || !synopsis) {
        return res.status(400).json({ message: "missing required fields" });
    }

    try {
        const novoFilme = await prisma.filme.create({
            data: {
                title,
                director,
                releaseYear: Number(releaseYear),
                genre,
                rating: Number(rating),
                synopsis,
            },
        });

        return res.status(201).json(novoFilme);
    } catch (error) {
        return res.status(500).json({ message: "internal error", error });
    }
});

router.put("/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: "invalid id" });

    if (!req.body || typeof req.body !== "object") {
        return res.status(400).json({
            message: "invalid request body",
            hint: "Use JSON body with Content-Type: application/json",
        });
    }

    const { title, director, releaseYear, genre, rating, synopsis } = req.body;

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title;
    if (director !== undefined) data.director = director;
    if (releaseYear !== undefined) data.releaseYear = Number(releaseYear);
    if (genre !== undefined) data.genre = genre;
    if (rating !== undefined) data.rating = Number(rating);
    if (synopsis !== undefined) data.synopsis = synopsis;

    try {
        const filmeAtualizado = await prisma.filme.update({
            where: { id },
            data,
        });

        return res.status(200).json({ message: "filme updated", filme: filmeAtualizado });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return res.status(404).json({ message: "filme not found" });
        }
        return res.status(500).json({ message: "internal error", error });
    }
});

router.delete("/:id", async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: "invalid id" });

    try {
        const filmeRemovido = await prisma.filme.delete({ where: { id } });
        return res.status(200).json({ message: "filme deleted", filme: filmeRemovido });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return res.status(404).json({ message: "filme not found" });
        }
        return res.status(500).json({ message: "internal error", error });
    }
});

export const filmesRouter = router;

