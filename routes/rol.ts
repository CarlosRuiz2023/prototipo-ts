import { Router } from "express";
import { rolesGet } from "../controllers/roles";

const router = Router();

router.get("/", rolesGet);

export default router;
