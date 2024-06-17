const CustomError = require('./customError') ; 

class NotFoundError extends CustomError {
    constructor(message) {
      super(message);
      this.statusCode = 404;
    }
  }

class Success extends CustomError {
    constructor(message) {
      super(message);
      this.statusCode = 200;
    }
  }
  
  class BadRequestError extends CustomError {
    constructor(message) {
      super(message);
      this.statusCode = 400;
    }
  }
  
  class UnAuthenticatedtError extends CustomError {
    constructor(message) {
      super(message);
      this.statusCode = 401;
    }
  }
  
  class UnAuthorizedError extends CustomError {
    constructor(message) {
      super(message);
      this.statusCode = 403;
    }
  }
  
  class FieldsNotFilledError extends CustomError {
    constructor() {
      super();
      this.statusCode = 400;
      this.message = "Please provide all the fields to perform the opertaion";
    }
  }

  class InternalServerError extends CustomError {
    constructor(message) {
      super(message);
      this.statusCode = 500;
    }
  }
  
  module.exports = {
    NotFoundError,
    BadRequestError,
    UnAuthenticatedtError,
    UnAuthorizedError,
    FieldsNotFilledError,
    Success,
    InternalServerError
  };