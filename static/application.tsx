import * as chitu_react from 'maishu-chitu-react';
import { Page, PageData } from "maishu-chitu";
import { errorHandle } from './error-handle';
import * as ReactDOM from "react-dom";
import * as React from "react";

import { SimpleMasterPage } from "./masters/simple-master-page";
import { MainMasterPage } from "./masters/main-master-page";
import "./content/admin_style_default.less"
import { WebsiteConfig } from "./website-config";

let simpleContainer = document.getElementById("simple-master");
let mainContainer = document.getElementById("main-master");
let blankContainer = document.getElementById("blank-master");

export class Application extends chitu_react.Application {
    private _config: WebsiteConfig;
    private _simpleMaster: SimpleMasterPage;
    private _mainMaster: MainMasterPage;

    constructor(config: WebsiteConfig) {
        super({
            container: {
                simple: simpleContainer,
                default: mainContainer,
                blank: blankContainer,
            }
        })

        this._config = config;
        this.processMenuItems(this._config);

        this.error.add((sender, error) => errorHandle(error));
        this.pageCreated.add((sender, page) => this.onPageCreated(page));

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

    showPage(pageUrl: string, args?: PageData, forceRender?: boolean): Page {
        args = args || {};
        let d = this.parseUrl(pageUrl);
        args.container = this._config.containers[d.pageName];
        return super.showPage(pageUrl, args, forceRender);
    }

    private async onPageCreated(page: Page) {
        let pageClassName = page.name.split("/").filter(o => o != "").join("-");
        page.element.className = `admin-page ${pageClassName}`;

    }

}

export function run(config: WebsiteConfig) {
    window["app"] = window["app"] || new Application(config);
    return window["app"];
}