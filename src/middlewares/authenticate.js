import createHttpError from "http-errors";
import { UserCollection } from "../db/models/user.js";
import { sessionColection } from "../db/models/session.js";

export const authenticate = async(req,res, next)=>{
    const authHeader = req.get('Authorization');

    if(!authHeader){
       return next(createHttpError(401,'Please provide Authorization header' ));
    };

    // const bearer = authHeader.split(' ')[0];
    // const token = authHeader.split(' ')[1];
    const [bearer, token] = authHeader.split(" ");

    if(bearer !== 'Bearer' || !token){
        return  next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    const session =  await sessionColection.findOne({
        accessToken:token,
    });

    if(!session){
        return next(createHttpError(401, 'Session not found'));
    }

    const isSessionTokenExpired = 
    new Date()> new Date(session.refreshTokenValidUntil) ; 

    if(isSessionTokenExpired){
        throw createHttpError(401, 'Session token expired');

    }
    const user = await UserCollection.findById(session.userId); 

    if(!user){
        return next(createHttpError(401));
    }
    req.user = user;
    next();
}; 