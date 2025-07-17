class APIResponse {
  public status: number;
  public message: string;
  public success: boolean;
  public data?: any;

  constructor({
    message = "Success",
    status = 200,
    data,
  }: APIResponseHandlerInterface) {
    this.message = message;
    this.status = status;
    this.success = true;
    if (data) this.data = data;
  }

  static send(status: number, message = "Success", data?: any): APIResponse {
    if (data) {
      return new APIResponse({ message, status, data });
    }
    return new APIResponse({ message, status });
  }
}

export default APIResponse;
