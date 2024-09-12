import createHttpError from "http-errors";

export const errorHandler = (err,req,res, next)=>{
  if (err instanceof createHttpError.HttpError) {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message, 
      data: null, 
    });
    return;
  }
    res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
    });
};