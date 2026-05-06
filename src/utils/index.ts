import { HttpException, HttpStatus } from '@nestjs/common';

export function handleHttpError(code: HttpStatus, errMsg: string) {
  throw new HttpException(
    {
      statusCode: code,
      message: errMsg,
    },
    code,
  );
}
