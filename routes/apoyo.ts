import { Router } from "express";
import { apoyosGet, apoyosEstatusGet } from "../controllers/apoyos";

const router = Router();

router.get("/", apoyosGet);

router.get("/estatus/", apoyosEstatusGet);

export default router;
