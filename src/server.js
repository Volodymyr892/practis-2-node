import express from "express"; 
import  pino  from "pino-http";
import cors from "cors";
import studentsRouter from "./routers/students.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
    const app = express();

        app.use(cors());
        app.use(express.json());
        app.use(
            pino ({
                transport:{
                    target: 'pino-pretty',
                }
            })
        );
        
        app.get("/", (reg, res)=>{
            res.json({
                message: 'Hello world!',
            }); 
        });

        app.use(studentsRouter);
       
        app.use('*', notFoundHandler);
        app.use(errorHandler);
        
        app.listen(PORT, ()=> {
            console.log(`Server is running on port ${PORT}`);
        });
 
    };