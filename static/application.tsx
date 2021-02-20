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
    private config: WebsiteConfig;
    private simpleMaster: SimpleMasterPage;
    private mainMaster: MainMasterPage;

    constructor(config: WebsiteConfig) {
        super({
            container: {
                simple: simpleContainer,
                default: mainContainer,
                blank: blankContainer,
            }
        })

        this.config = config;
        this.processMenuItems(this.config);

        this.error.add((sender, error) => errorHandle(error));
        this.pageCreated.add((sender, page) => this.onPageCreated(page));

        ReactDOM.render(<SimpleMasterPage app={this} ref={e => this.simpleMaster = e || this.simpleMaster} />, simpleContainer);
        ReactDOM.render(<MainMasterPage app={this} menuItems={this.config.menuItems}
            ref={e => this.mainMaster = e || this.mainMaster} />, mainContainer);
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
        args.container = this.config.containers[d.pageName];
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