import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MyRequest } from './app';

export const ServerOptions = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<MyRequest>();
        return request.serverOptions;
    },
);