import { StudentsCollection } from "../db/models/student.js";

export const getAllStudents = async()=> {
    const students = await StudentsCollection.find(); 
    return students;
};
export const getStudentsById = async(ObjectId)=> {
    const student =await StudentsCollection.findById(ObjectId);
    return student; 
};