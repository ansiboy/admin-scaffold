import * as chitu_react from 'maishu-chitu-react';
import { Page, PageData } from "maishu-chitu";
import { errorHandle } from './error-handle';
import * as ReactDOM from "react-dom";
import * as React from "react";

import { SimpleMasterPage } from "./masters/simple-master-page";
import { MainMasterPage } from "./masters/main-master-page";
import { WebsiteConfig } from "./website-config";

// import "./content/bootstrap.css";
// import "./content/admin_style_default.less";
import "node_modules/font-awesome/css/font-awesome.css";
import { pathConcat } from 'maishu-toolkit';

let simpleContainer = document.createElement("div");
document.body.appendChild(simpleContainer);
simpleContainer.id = "simple-master";

let mainContainer = document.createElement("div");
document.body.appendChild(mainContainer);
mainContainer.id = "main-master";

let blankContainer = document.createElement("div");
document.body.appendChild(blankContainer);
blankContainer.id = "blank-master";

export class Application extends chitu_react.Application {
    private _config: WebsiteConfig;
    private _simpleMaster: SimpleMasterPage;
    private _mainMaster: MainMasterPage;
    private req: Function;

    constructor(config: WebsiteConfig, req: Function) {
        super({
            container: {
                simple: simpleContainer,
                default: mainContainer,
                blank: blankContainer,
            }
        })

        this.req = req;
        this._config = config;
        this.processMenuItems(this._config);

        this.error.add((sender, error) => errorHandle(error));
        this.pageCreated.add((sender, page) => this.onPageCreated(page));

        this.pageContainers = config.containers;

        ReactDOM.render(<SimpleMasterPage app={this} ref={e => this._simpleMaster = e || this._simpleMaster} />, simpleContainer);
        ReactDOM.render(<MainMasterPage app={this} menuItems={this._config.menuItems}
            ref={e => this._mainMaster = e || this._mainMaster} />, mainContainer);
    }

    get config() {
        return this._config;
    }

    get simpleMaster() {
        return this._simpleMaster;
    }

    get mainMaster() {
        return this._mainMaster;;
    }

    private processMenuItems(config: WebsiteConfig) {
        config.menuItems = config.menuItems || [];
        let stack = [...config.menuItems];
        while (stack.length > 0) {
            let item = stack.pop();
            item.type = item.type || "menu";
            item.children = item.children || [];
            item.children.forEach(c => {
                c.parent = item;
                stack.push(c);
            });
        }
    }

    // showPage(pageUrl: string, forceRender?: boolean): Page {
    //     // args = args || {};
    //     let d = this.parseUrl(pageUrl);
    //     let container = (this._config.containers || {})[d.pageName];
    //     if (container != null) {
    //         if (pageUrl.indexOf('?') > 0) {
    //             pageUrl = pageUrl + `&container=${container}`
    //         }
    //         else {
    //             pageUrl = pageUrl + `?container=${container}`
    //         }
    //     }

    //     return super.showPage(pageUrl, forceRender);
    // }

    private async onPageCreated(page: Page) {
        let pageClassName = page.name.split("/").filter(o => o != "").join("-");
        page.element.className = `admin-page ${pageClassName}`;

    }


    private siteRequireJS = {};

    async loadjs(path: string) {

        if (path.startsWith("modules//")) {
            path = path.substr("modules//".length);
            let arr = path.split("/");
            console.assert(arr.length >= 2);
            let sitePath = arr.shift();
            if (!this.siteRequireJS[sitePath]) {
                let websiteConfig = await this.getWebsiteConfig(sitePath);
                this.siteRequireJS[sitePath] = this.configRequirejs(websiteConfig, sitePath);
            }

            let newPath = `modules/${arr.join('/')}`;
            return new Promise((resolve, reject) => {
                this.siteRequireJS[sitePath]([newPath],
                    mod => {
                        resolve(mod)
                    },
                    err => {
                        reject(err)
                    }
                );
            })
        }

        return new Promise<any>((reslove, reject) => {
            this.req([path],
                function (result: any) {
                    reslove(result);
                },
                function (err: Error) {
                    reject(err);
                });


        });
    }

    private getWebsiteConfig(sitePath: string) {
        return new Promise<WebsiteConfig>((resolve, reject) => {
            let websiteConfigPath = pathConcat(sitePath, "website-config.js");
            requirejs([websiteConfigPath], mod => {
                resolve(mod.default || mod);
            }, err => {
                reject(err);
            })
        })
    }

    private configRequirejs(stationWebsiteConfig: WebsiteConfig, sitePath: string) {
        stationWebsiteConfig.requirejs = stationWebsiteConfig.requirejs || { paths: {} };
        stationWebsiteConfig.requirejs.paths = stationWebsiteConfig.requirejs.paths || {};
        stationWebsiteConfig.requirejs["context"] = sitePath;
        stationWebsiteConfig.requirejs["baseUrl"] = sitePath;

        let req = requirejs.config(stationWebsiteConfig.requirejs);
        return req;
    }

    redirect(path: string) {
        if (path.startsWith("./") && location.hash.length > 1) {
            let currentPath = location.hash.substr(1);
            let arr = currentPath.split("/");
            arr.pop();
            let parentPath = arr.join("/");
            path = pathConcat(parentPath, path);
        }

        let r = super.redirect(path);
        return r;
    }
}

export function run(config: WebsiteConfig, req) {
    window["app"] = window["app"] || new Application(config, req);
    return window["app"];
}