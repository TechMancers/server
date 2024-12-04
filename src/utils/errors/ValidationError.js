const AppError = require("./Error");

class ValidationError extends AppError {
    constructor(message = "Invalid input") {
        super(message, 400, "ValidationError");
    }
}

module.exports = ValidationError;
