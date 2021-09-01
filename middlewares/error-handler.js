import {ValidationError} from "joi"
import NewError from '../services/NewError'
import {DEBUG_MODE} from "../config"

function errorHandler(err, req , res , next){
    let statusCode = 500;

    let message = {
        error : "Internal Server Error.",
        ...( DEBUG_MODE === "true" && {originalError : err.message})
    }

    if(err instanceof ValidationError)
    {
        statusCode = 422;
        message.error = 'Please provide valid data.'
    }

    if(err instanceof NewError){
        statusCode = err.statusCode;
        message.error = err.message;
    }
    return res.status(statusCode).json(message);
}

export default errorHandler;