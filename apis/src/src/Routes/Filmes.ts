import { Router } from "express";
import { FilmesController } from "../controllers/filmesController";

const router = Router();
const controller = new FilmesController();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export const filmesRouter = router;

