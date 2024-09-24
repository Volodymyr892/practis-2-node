import { model, Schema } from "mongoose"; 
import { generList } from "../../constacts/student.js";
import { handleSaveError, setUpdateoptions } from "./hooks.js";
const studentsSchema = new Schema(
    {
    name: {
        type: String,
        required: [true, "Name must be exist"]
      },
      age: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        required: true,
        enum: generList,
      },
      avgMark: {
        type: Number,
        required: true,
      },
      onDuty: {
        type: Boolean,
        required: true,
        default: false,
      },
      parentId:{
        type: Schema.Types.ObjectId, 
        ref: 'users' 
      },
    },

    {
      timestamps: true,
      versionKey: false,
    },
);

studentsSchema.post("save",handleSaveError);
studentsSchema.pre("findOneAndUpdate", setUpdateoptions);
studentsSchema.post("findOneAndUpdate",handleSaveError);
export const StudentsCollection = model("students", studentsSchema);