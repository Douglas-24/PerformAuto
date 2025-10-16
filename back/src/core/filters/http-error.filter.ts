import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter<T> implements ExceptionFilter {
   catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    
    response
      .status(status)
      .json({
        error:true,
        statusCode: status,
        timestamp: new Date().toDateString(),
        path: request.url,
        message: exception.message
      });
  }
}
