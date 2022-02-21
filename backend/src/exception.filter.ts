import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const isHttpException = exception instanceof HttpException;
    const httpStatus = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    let stack;
    if (!isHttpException) {
      stack = (exception as Error).stack;
    }

    const responseBody = isHttpException
      ? exception.getResponse()
      : {
          statusCode: httpStatus,
          timestamp: new Date().toISOString(),
          path: httpAdapter.getRequestUrl(ctx.getRequest()),
          stack,
        };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
