import { Router } from "express";

import { POST } from "../controllers/users.controllers";

const router = Router();

router.post("/", POST);

export default router;
