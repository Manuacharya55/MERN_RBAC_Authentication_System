
export const AsyncHandler = (handlerFunction) =>{
    return (req,res,next) =>{
        Promise.resolve(handlerFunction(req,res,next)).catch(err=> next(err))
    }
}