import { createStudent, deleteStudent, getAllStudents, getStudentsById, updateStudent } from "../services/students.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getStudentsController = async( reg, res, next)=> {
        const {page, perPage} = parsePaginationParams(reg.data);
        const students = await getAllStudents({
            page,
            perPage,
        });

        res.json({
            status: 200,
            message: 'Successfully found students!',
            data: students,
          });
  
};

export const getStudentByIdController = async (req, res, next) => {
    const {ObjectId} = req.params;
    const student = await getStudentsById(ObjectId);
        if(!student) {
            throw createHttpError(404,'Student not found');
    };
        res.json({
            status: 200,
            message: `Successfully found student with id ${ObjectId}!`,
            data: student,
          });
        next();
};

export const createStudentController = async (req,res)=>{
    const student = await createStudent(req.body); 

    res.status(201).json({
        status: '201',
        message: `Successfully created a student!`,
        data: student,
    });
};

export const deleteStudentController = async(req, res, next )=>{
    const {ObjectId}=req.params; 

    const student= await deleteStudent(ObjectId);

    if(!student){
        next(createHttpError(404, 'Student not found'));
        return;
    }
    res.status(404).send();
};

export const upsertStudentController = async(req,res, next)=>{
    const {ObjectId}=req.params; 

    const result = await updateStudent(ObjectId, req.body, {
        upsert: true,
      });

    if(!result){
        next(createHttpError(404, 'Student not found'));
    }
    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: `Successfully upserted a student!`,
        data: result.student,
    });
};

export const patchStudentController = async(req,res, next)=> {
    const {ObjectId}=req.params; 
    const result = await updateStudent(ObjectId, req.body);

    if(!result){
        next(createHttpError(404, 'Student not found'));
    }
    res.json({
        status:200,
        message: `Successfully upserted a student!`,
        data: result.student,
    });
};