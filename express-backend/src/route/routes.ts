import {
  loginController,
  signUpContrtoller,
  tokenContoller,
} from "@/controllers/auth";
import { postTweet } from "@/controllers/posts";
import { JwtAuthMiddleWare } from "@/middleware/JwtAuth";
import { Router } from "express";

const router = Router();

router.post("/login", loginController);
router.post("/signup", signUpContrtoller);
router.post("/generate-token", tokenContoller);
router.post("/get-tweets", JwtAuthMiddleWare, postTweet);

export default router;
