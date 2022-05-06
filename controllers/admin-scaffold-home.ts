import { action, controller, ServerContext, serverContext } from "maishu-node-mvc";
import { EXTRNAL, HttpHeaderNames, STATIC, WEBSITECONFIG } from "../common";
import { errors } from "../errors";
import * as querystring from "querystring";
import * as url from "url";
import * as fs from "fs";
import { objectAssignDeep } from "maishu-toolkit";

@controller("/")
export class AdminScaffoldHome {
    @action(WEBSITECONFIG)
    websiteConfig(@serverContext ctx: ServerContext) {
        let websiteConfigPathName = `${STATIC}/${WEBSITECONFIG}.js`;
        var jsFile = ctx.rootDirectory.findFile(websiteConfigPathName);
        if (!jsFile)
            throw errors.virtualFileNotExists(websiteConfigPathName);


        let applicationId = ctx.req.headers[HttpHeaderNames.ApplicationId];
        let u = url.parse(ctx.req.url || "");
        let q = u.query ? querystring.parse(u.query) : {};
        let appId = ctx.req.headers[HttpHeaderNames.ApplicationId] || q[HttpHeaderNames.ApplicationId];
        if (appId == null)
            throw errors.cannotGetApplicationId();

        let websiteConfig = loadWebsiteConfig(jsFile);

        let extranWebsiteConfigPath = ctx.rootDirectory.findFile(`${EXTRNAL}/${applicationId}/${STATIC}/${WEBSITECONFIG}.js`);
        if (extranWebsiteConfigPath != null) {
            if (!fs.existsSync(extranWebsiteConfigPath))
                throw errors.fileNotExists(extranWebsiteConfigPath);

            let extranWebsiteConfig = loadWebsiteConfig(extranWebsiteConfigPath);
            websiteConfig = objectAssignDeep(websiteConfig, extranWebsiteConfig);
        }

        return websiteConfig;;
    }
}

function loadWebsiteConfig(modulePath: string) {
    let mod = require(modulePath);
    if (!mod.default)
        throw new Error(`Module '${modulePath}' has none default member.`);

    return mod.default;
}