import {
  loginController,
  signUpContrtoller,
  tokenContoller,
} from "@/controllers/auth";
import { getTweetController } from "@/controllers/tweets";
import { JwtAuthMiddleWare } from "@/middleware/JwtAuth";
import { Router } from "express";

const router = Router();

router.post("/login", loginController);
router.post("/signup", signUpContrtoller);
router.get("/generate-token", tokenContoller);
router.get("/get-tweets/:id", JwtAuthMiddleWare, getTweetController);

export default router;
