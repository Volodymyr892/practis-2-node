import bcrypt from "bcrypt";
import {randomBytes} from 'crypto';
import { UserCollection } from "../db/models/user.js";
import { sessionColection } from "../db/models/session.js";
import createHttpError from "http-errors";
import { FIFTEEN_MINUTES, ONE_DAY } from "../constacts/index.js";

export const registerUser = async(payload)=>{
    const user = await UserCollection.findOne(({
        email: payload.email
    }));

    if(user)throw createHttpError(409, 'Email is use');

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await UserCollection.create({
        ...payload,
        password: encryptedPassword,
    });
};

export const loginUser = async(payload)=>{
    const user = await UserCollection.findOne(({
        email: payload.email,
    }));

    if(!user) throw createHttpError(401, 'User not found');

    await sessionColection.deleteOne({userId:user._id}); 

    const isEqual = await bcrypt.compare(payload.password, user.password);
    if(!isEqual){
        throw createHttpError(401, 'Email or password invalid');
    }


    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return await sessionColection.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now()+FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
    });
};

export const logoutUser =  async (sessionId)=> {
    await  sessionColection.deleteOne({_id: sessionId});
};

const createSession = ()=>{
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now()+ FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
};
};

export const refreshUsersSession = async ({sessionId, refreshToken})=>{
    const oldSession = await sessionColection.findOne({
        _id: sessionId,
        refreshToken,
    });

    if(!oldSession){
        throw createHttpError(401,'Session not found');
    }

    const isSessionTokenExpired = 
        new Date()> new Date(oldSession.refreshTokenValidUntil) ; 
    
    if(isSessionTokenExpired){
        throw createHttpError(401, 'Session token expired');
    }

    await sessionColection.deleteOne({ _id: sessionId,  refreshToken}); 
    
    const newSession = createSession();

    return await sessionColection.create({
        userId:oldSession.userId,
        ...newSession,
    });
};