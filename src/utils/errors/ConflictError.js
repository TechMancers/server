const AppError = require("./Error");

class ConflictError extends AppError {
    constructor(message = "Conflict") {
        super(message, 409, "ConflictError");
    }
}

module.exports = ConflictError;