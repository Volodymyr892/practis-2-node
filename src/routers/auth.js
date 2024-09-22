import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema, loginuserSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUsercontroller, loginUserController} from "../controllers/auth.js";

const router = Router();

router.post(
    "/register",
    validateBody(registerUserSchema),
    ctrlWrapper(registerUsercontroller)
);

router.post(
    "/login",
    validateBody(loginuserSchema),
    ctrlWrapper(loginUserController),
);

export default router;