const { ValidationError, NotFoundError, ConflictError, InternalServerError } = require("./errors");

class ErrorFactory {
    static createError(type, message) {
        switch (type) {
            case "ValidationError":
                return new ValidationError(message);
            case "NotFoundError":
                return new NotFoundError(message);
            case "ConflictError":
                return new ConflictError(message);
            case "InternalServerError":
                return new InternalServerError(message);
            default:
                return new InternalServerError("An unexpected error occurred");
        }
    }
}

module.exports = ErrorFactory;
