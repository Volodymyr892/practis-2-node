import bcrypt from "bcrypt";
import { UserCollection } from "../db/models/user.js";

export const registerUser = async(payload)=>{
    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await UserCollection.create({
        ...payload,
        password: encryptedPassword,
    });
};