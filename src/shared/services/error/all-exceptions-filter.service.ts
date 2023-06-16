import { ExceptionFilter, Catch, ArgumentsHost, } from '@nestjs/common';
import { ErrorResponse } from 'src/shared/models/error-response.model';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ErrorService } from './error.service';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  public catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const errorResponse: ErrorResponse = {
      ...ErrorService.handleError(exception),
      dateTime: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      error: exception
    };
    httpAdapter.reply(ctx.getResponse(), errorResponse, errorResponse.statusCode);
  }
}