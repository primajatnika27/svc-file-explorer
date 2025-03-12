export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data?: T;
}

export class ApiResponseHandler {
  static success<T>(data: T, message: string = "Success"): ApiResponse<T> {
    return {
      status: 200,
      success: true,
      message,
      data,
    };
  }

  static created<T>(
    data: T,
    message: string = "Created successfully"
  ): ApiResponse<T> {
    return {
      status: 201,
      success: true,
      message,
      data,
    };
  }

  static error(message: string, status: number = 500): ApiResponse<null> {
    return {
      status,
      success: false,
      message,
    };
  }

  static badRequest(message: string): ApiResponse<null> {
    return this.error(message, 400);
  }

  static notFound(message: string): ApiResponse<null> {
    return this.error(message, 404);
  }
}
