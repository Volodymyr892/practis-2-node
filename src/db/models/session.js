// import { date, string } from "joi";
import { model, Schema } from "mongoose";
import { handleSaveError, setUpdateoptions } from "./hooks.js";

 const sessionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        accessToken: {
            type: String,
            required: true,
        }, 
        refreshToken: {
            type:String,
            required:true,
        },
        accessTokenValidUntil: {
            type: Date,
            required:true,
        },
        refreshTokenValidUntil:{
            type:Date,
            required:true, 
        }
    },
    { 
        timestamps: true, 
        versionKey: false 
    },
);

sessionSchema.post("save",handleSaveError);
sessionSchema.pre("findOneAndUpdate", setUpdateoptions);
sessionSchema.post("findOneAndUpdate",handleSaveError);


export  const sessionColection = model('sessions', sessionSchema);