class AppError {
    constructor(message, statusCode, type = "GenericError") {
        this.message = message;
        this.statusCode = statusCode;
        this.type = type;
    }

    format() {
        return {
            success: false,
            type: this.type,
            message: this.message,
        };
    }
}

module.exports = AppError;
