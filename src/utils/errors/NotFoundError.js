const AppError = require("./Error");

class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404, "NotFoundError");
    }
}

module.exports = NotFoundError;
