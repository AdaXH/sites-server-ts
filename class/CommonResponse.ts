import { CommonObj } from '../typings';

export class CommonResponse<T> {
  private data: T;
  private success: boolean;
  private errorMessage: string = null;
  private errorCode: string = null;
  private errorStack: CommonObj = null;

  public setData(data: T): void {
    this.data = data;
  }

  public setSuccess(success: boolean): void {
    this.success = success;
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  public setErrorCode(errorCode: string): void {
    this.errorCode = errorCode;
  }

  public setErrorStack(errorStack: CommonObj): void {
    this.errorStack = errorStack;
  }

  static success(data: unknown): CommonResponse<unknown> {
    const instance = new CommonResponse();
    instance.setData(data);
    instance.setSuccess(true);
    return instance;
  }

  static error(error: CommonObj): CommonResponse<unknown> {
    const instance = new CommonResponse();
    instance.setErrorMessage(error?.message);
    instance.setErrorCode(error?.errorCode);
    instance.setErrorStack(error?.errorStack);
    instance.setSuccess(false);
    return instance;
  }
}
