import { getAllStudents, getStudentsById } from "../services/students.js";
import createHttpError from "http-errors";

export const getStudentsController = async( reg, res, next)=> {
    try {
        const students = await getAllStudents();
        res.json({
            status: 200,
            message: 'Successfully found students!',
            data: students,
          });
    } catch (error) {
        next(error);
    }
};

export const getStudentByIdController = async (req, res, next) => {
    const {ObjectId} = req.params;
    const student = await getStudentsById(ObjectId);
        if(!student) {
            // next(new Error('Student not found'));
            // return;
            throw createHttpError(404,'Student not found');
    };

        res.json({
            status: 200,
            message: `Successfully found student with id ${ObjectId}!`,
            data: student,
          });
        next();
};