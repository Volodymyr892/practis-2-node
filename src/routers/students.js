import { Router } from "express";
import { 
    getStudentsController,
    getStudentByIdController, 
    createStudentController, 
    deleteStudentController, 
    upsertStudentController, 
    patchStudentController }  from "../controllers/students.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
    createStudentSchema, 
    updateStudentSchema } from "../validation/students.js";
import { isValidId } from "../middlewares/isValidid.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constacts/index.js";

const router = Router();
router.use(authenticate);
router.get(
    '/', 
    checkRoles(ROLES.TEACHER),
    ctrlWrapper(getStudentsController)
);
router.get('/:ObjectId',
    checkRoles(ROLES.PARENT, ROLES.TEACHER),
    isValidId,
    ctrlWrapper(getStudentByIdController));

router.post(
        "/",
        checkRoles(ROLES.TEACHER),
        validateBody(createStudentSchema),
        ctrlWrapper(createStudentController));

router.delete('/:ObjectId', 
    checkRoles(ROLES.TEACHER),
    isValidId,
    ctrlWrapper(deleteStudentController));

router.put(
    '/:ObjectId',
    checkRoles(ROLES.TEACHER),
    isValidId,
    validateBody(createStudentSchema), 
    ctrlWrapper(upsertStudentController));
router.patch('/:ObjectId', 
    checkRoles(ROLES.TEACHER, ROLES.PARENT),
    isValidId,
    validateBody(updateStudentSchema),
    ctrlWrapper(patchStudentController));

export default router;