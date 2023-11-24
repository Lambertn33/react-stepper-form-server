import { Router } from "express";

import { GET, POST } from "../controllers/users.controllers";

import { validateUser } from "../validators/user.validate";

const router = Router();

router.get("/", GET);

router.post("/", validateUser, POST);

export default router;
