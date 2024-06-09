class DomainError extends Error {
  protected errorName = "domain_error";

  protected httpStatusCode = 500;

  protected data: object;

  public constructor(message: string = "", data: object = {}) {
    super(message);
    this.data = data;
  }

  public getHttpCode(): number {
    return this.httpStatusCode;
  }

  public getData(): object {
    return this.data;
  }

  public getName(): string {
    return this.errorName;
  }
}

export class ValidationError extends DomainError {
  constructor(message: string, data = {}) {
    super(message);
    this.errorName = "invalid_request";
    this.httpStatusCode = 400;
    this.data = data;
  }
}

export class AuthenticationError extends DomainError {
  constructor(message: string, data = {}) {
    super(message);
    this.errorName = "not_authenticated";
    this.httpStatusCode = 401;
    this.data = data;
  }
}

export class ConflictError extends DomainError {
  constructor(message: string, data = {}) {
    super(message);
    this.errorName = "conflict";
    this.httpStatusCode = 409;
    this.data = data;
  }
}

export class AuthorizationError extends DomainError {
  constructor(message: string, data = {}) {
    super(message);
    this.errorName = "not_authorized";
    this.httpStatusCode = 403;
    this.data = data;
  }
}

export class ResourceNotFoundError extends DomainError {
  constructor(message: string, data = {}) {
    super(message);
    this.errorName = "not_found";
    this.httpStatusCode = 404;
    this.data = data;
  }
}

export class BadRequestError extends DomainError {
  constructor(message: string, data = {}) {
    super(message);
    this.errorName = "bad_request";
    this.httpStatusCode = 400;
    this.data = data;
  }
}
