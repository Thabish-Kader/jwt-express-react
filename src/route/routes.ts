import { loginController, signUpContrtoller } from "@/controllers/auth";
import { Router } from "express";

const router = Router();

router.post("/login", loginController);
router.post("/signup", signUpContrtoller);

export default router;
