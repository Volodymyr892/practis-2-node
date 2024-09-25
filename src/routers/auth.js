import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema, loginuserSchema, requestResetEmailSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUsercontroller, loginUserController, refreshUserSessionController, logoutUserController, requestResetEmailController} from "../controllers/auth.js";

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
router.post(
    "/logout",
    ctrlWrapper(logoutUserController),
);
router.post(
    "/refresh",
    ctrlWrapper(refreshUserSessionController),
);
router.post(
    '/request-reset-email',
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController)
);
export default router;