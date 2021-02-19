import assert from 'assert';

export class WizKnownError extends Error {
  code: string | number;
  externCode?: string;

  constructor(message: string, code: string | number, externCode?: string) {
    super(message);
    assert(message);
    assert(code);
    this.message = message;
    this.code = code;
    if (externCode) {
      this.externCode = externCode;
    }
  }

  toResult() {
    return {
      returnCode: this.code,
      returnMessage: this.message,
      externCode: this.externCode,
      code: this.code,
    };
  }

  toJSON() {
    return this.toResult();
  }

  //
  log() {
    console.error(this);
  }

  //
  static noErrorResult(result = {}) {
    return {
      returnCode: 200,
      returnMessage: 'OK',
      result,
    };
  }
}

export class WizInvalidTokenError extends WizKnownError {
  constructor(message = 'Invalid token') {
    super(message, 'WizErrorInvalidToken');
  }
}


export class WizInvalidUserError extends WizKnownError {
  constructor(message = 'Invalid user') {
    super(message, 'WizErrorInvalidUser');
  }
}


export class WizInvalidPasswordError extends WizKnownError {
  constructor(message = 'invalid password') {
    super(message, 'WizErrorInvalidPassword');
  }
}

export class WizInvalidParamError extends WizKnownError {
  constructor(message: string) {
    super(message, 'WizErrorInvalidParam');
  }
}


export class WizNetworkError extends WizKnownError {
  constructor(message: string) {
    super(message, 'WizErrorNetwork');
  }
}

export class WizInternalError extends WizKnownError {
  constructor(message: string, externCode?: string) {
    super(message, 'WizErrorInternal', externCode);
  }
}

export class WizTimeoutError extends WizKnownError {
  //
  constructor(message: string) {
    super(message, 'WizErrorTimeout');
  }

  //
  log() {
    console.error(`${this.code} ${this.message}`);
  }
}

export class WizNotExistsError extends WizKnownError {
  constructor(message: string) {
    super(message, 'WizNotExistsError');
  }
}

export class WizServerError extends WizKnownError {
  constructor(message: string, externCode?: string) {
    super(message, 'WizErrorServer', externCode);
  }
}
