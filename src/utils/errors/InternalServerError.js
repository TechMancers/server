const AppError = require("./Error");

class InternalServerError extends AppError {
    constructor(message = "Internal server error") {
        super(message, 500, "InternalServerError");
    }
}

module.exports = InternalServerError;