import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Request = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest();
  },
);
