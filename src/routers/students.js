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

const router = Router();

router.get('/', ctrlWrapper(getStudentsController));
router.get('/:ObjectId',
    isValidId,
    ctrlWrapper(getStudentByIdController));

router.post(
        "/register",
        validateBody(createStudentSchema),
        ctrlWrapper(createStudentController));
// router.post('/students', 
//     validateBody(createStudentSchema),
//     ctrlWrapper(createStudentController));

router.delete('/:ObjectId', 
    isValidId,
    ctrlWrapper(deleteStudentController));

router.put('/:ObjectId',
    isValidId,
    validateBody(createStudentSchema), 
    ctrlWrapper(upsertStudentController));
router.patch('/:ObjectId', 
    isValidId,
    validateBody(updateStudentSchema),
    ctrlWrapper(patchStudentController));

export default router;