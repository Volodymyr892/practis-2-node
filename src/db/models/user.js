import { model, Schema } from "mongoose";  
import { emailRegexp } from "../../constacts/user.js";
import { handleSaveError, setUpdateoptions } from "./hooks.js";
const userSchema = new Schema (
    {
        name: {
            type: String, 
            required:true
        },
        email:{
            type: String,
            match: emailRegexp,
            required:true, 
            unique: true
        },
        password: {
            type:String, 
            required:true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

userSchema.methods.toJson = function(){
    const obj= this.toOject();
    delete obj.password;
    return obj;
};

userSchema.post("save",handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateoptions);
userSchema.post("findOneAndUpdate",handleSaveError);

export const UserCollection = model('users', userSchema); 