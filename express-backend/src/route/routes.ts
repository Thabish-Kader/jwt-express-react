import { loginController, signUpContrtoller } from "@/controllers/auth";
import { postTweet } from "@/controllers/posts";
import { JwtAuthMiddleWare } from "@/middleware/JwtAuth";
import { Router } from "express";

const router = Router();

router.post("/login", loginController);
router.post("/signup", signUpContrtoller);
router.post("/tweet", JwtAuthMiddleWare, postTweet);

export default router;
