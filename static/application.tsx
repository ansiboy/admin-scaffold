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

    constructor(config: WebsiteConfig) {
        super({
            container: {
                simple: simpleContainer,
                default: mainContainer,
                blank: blankContainer,
            }
        })

        this.config = config;

        this.error.add((sender, error) => errorHandle(error));
        this.pageCreated.add((sender, page) => this.onPageCreated(page));

        ReactDOM.render(<SimpleMasterPage app={this} />, simpleContainer);
        ReactDOM.render(<MainMasterPage app={this} />, mainContainer);

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