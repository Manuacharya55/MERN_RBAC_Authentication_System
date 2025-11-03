
export const GlobalError =(err,req,res,next)=>{
    const success = err.success || false;
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something Went wrong";

    res.status(statusCode).json({
        success,
        statusCode,
        message
    })
}