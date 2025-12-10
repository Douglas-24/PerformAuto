import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorFilter<T> implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      statusCode: status,
      message: this.instanceErrorPrisma(exception),
      code: exception.code,
      timestamp: new Date().toISOString(),
    });
  }

  instanceErrorPrisma(exception: Prisma.PrismaClientKnownRequestError): string {
    let messageError
    console.log(exception);
    
    if (exception.code = 'P2002') {
      const fields = exception.meta?.target;
      messageError = `Error: campo(s) duplicado(s): ` + fields
    }
    return messageError
  }
}
