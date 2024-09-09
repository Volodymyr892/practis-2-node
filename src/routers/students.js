import { Router } from "express";
import { getStudentsController, getStudentByIdController, createStudentController, deleteStudentController, upsertStudentController, patchStudentController } from "../controllers/students.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get('/students', ctrlWrapper(getStudentsController));
router.get('/students/:ObjectId',ctrlWrapper(getStudentByIdController));

router.post('/students', ctrlWrapper(createStudentController));

router.delete('/students/:ObjectId', ctrlWrapper(deleteStudentController));

router.put('/students/:ObjectId', ctrlWrapper(upsertStudentController));
router.patch('/students/:ObjectId', ctrlWrapper(patchStudentController));

export default router;