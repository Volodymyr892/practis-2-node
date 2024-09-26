import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema, loginuserSchema, requestResetEmailSchema, resetPasswordShema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUsercontroller, loginUserController, refreshUserSessionController, logoutUserController, requestResetEmailController, resetPasswordController} from "../controllers/auth.js";

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
router.post(
    '/reset-password',
    validateBody(resetPasswordShema),
    ctrlWrapper(resetPasswordController),
);

export default router;