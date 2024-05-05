export class AuthError extends Error {
  constructor(message: string = "Not authorized") {
    super(message);
    this.name = "AuthError";
  }
}

export class NeedAuthError extends Error {
  constructor(message: string = "Not authorized") {
    super(message);
    this.name = "NeedAuthError";
  }
}

export class BadRequest extends Error {
  constructor(message: string = "BadRequest") {
    super(message);
    this.name = "BadRequest";
  }
}
