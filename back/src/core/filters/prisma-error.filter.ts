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
      message: this.instanceErrorPrisma(exception.code),
      code: exception.code,
      timestamp: new Date().toISOString(),
    });
  }

  instanceErrorPrisma(code:string):string{
    let messageError

    if(code = 'P2002')messageError='Campos duplicados'
    // else if (code) messageError = ''
    return messageError
  }
}
