import { Controller, Get, ArgumentsHost } from '@nestjs/common';
import { errors } from '../errors';
import { Options } from '../app';
import { ServerOptions } from "../decorators";
import * as fs from "fs";
import * as path from 'path';

@Controller()
export class HomeController {

    @Get()
    index() {
        return "Index Page"
    }

    @Get("/website-config")
    websiteConfig(@ServerOptions() options: Options) {
        if (!options) throw errors.argumentNull("options");
        if (!options.websiteDirectory) throw errors.argumentFieldNull("websiteDirectory", "options");

        if (!fs.existsSync(options.websiteDirectory))
            throw errors.pathNotExists(options.websiteDirectory);

        let staticDirectory = path.join(options.websiteDirectory, "static");
        if (!fs.existsSync(staticDirectory))
            return null;

        let websiteConfigPath = path.join(staticDirectory, "website-config.js");
        if (!fs.existsSync(websiteConfigPath))
            return null;

        let websiteConfigModule = require(websiteConfigPath);
        let websiteConfigDefault = websiteConfigModule.default;
        if (!websiteConfigDefault)
            throw errors.moduleNoneDefaultMember(websiteConfigModule);

        return websiteConfigDefault;
    }


}