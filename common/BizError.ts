export class BizError<E> extends Error {
  private errorCode: string;
  private errorMessage: string;
  private errorStack: E;
  constructor(message?: string, errorCode?: string, errorStack?: E) {
    super(message);
    this.errorCode = errorCode;
    this.errorStack = errorStack;
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  public setErrorCode(errorCode: string): void {
    this.errorCode = errorCode;
  }

  public setErrorStack(errorStack: E): void {
    this.errorStack = errorStack;
  }
}

export enum ErrorCodeEnum {
  'NOT_FOUND' = 'NOT_FOUND',
  'ARGUMENUT_ERROR' = 'ARGUMENUT_ERROR',
  'ARGUMENUT_TYPE_ERROR' = 'ARGUMENUT_TYPE_ERROR',
  'REQUIRED_ARGUMENUT' = 'REQUIRED_ARGUMENUT',
  'ARGUMRNT_EXIST' = 'ARGUMRNT_EXIST',
  'ACCOUNT_PASSWORD_NOT_MATCH' = 'ACCOUNT_PASSWORD_NOT_MATCH',
}
