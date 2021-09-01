class NewError extends Error {
    constructor(statusCode , error){
        super();
        this.statusCode = statusCode
        this.message      = error
    }

    static error(statusCode , error){
        return new NewError( statusCode , error )
    }
}

export default NewError;