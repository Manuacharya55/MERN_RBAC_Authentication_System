
export default class ApiError extends Error{
    constructor(statusCode,message,error){
        super(message)
        this.success = false;
        this.statusCode = this.statusCode;
        this.data = null;
        this.error = error
        Error.captureStackTrace(this,this.constructor)
        
    }
}