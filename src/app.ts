import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';
import { errors } from './errors';

export interface Options {
    port: number
    websiteDirectory: string,
    logger?: NestApplicationContextOptions["logger"]
}

export type MyRequest = Request & { serverOptions: Options };

export async function createApp(options: Options) {
    if (!options) throw errors.argumentNull("options");
    if (!options.port) throw errors.argumentFieldNull("port", "options");
    if (!options.websiteDirectory) throw errors.argumentFieldNull("websiteDirectory", "options");

    const app = await NestFactory.create(AppModule, {
        cors: true, logger: options.logger,
    });

    app.use((req: MyRequest, res: Response, next: NextFunction) => {
        req.serverOptions = options;
        next();
    })


    return app;
}

