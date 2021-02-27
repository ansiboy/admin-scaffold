import { MasterPage } from "./master-page";
import * as React from "react";
import { masterPageNames } from "./names";

interface State {
    toolbar?: JSX.Element,
}

export class SimpleMasterPage extends MasterPage<State>{

    name: string = masterPageNames.simple;
    pageContainer: HTMLElement;

    get element() {
        return this.pageContainer
    }

    setToolbar(value: JSX.Element) {
        this.setState({ toolbar: value })
    }

    render() {
        return <div className="main" ref={e => this.pageContainer = e || this.pageContainer}>
            <nav className="navbar navbar-default">
                {this.state?.toolbar}
            </nav>
            <div className={`page-container page-placeholder`}
                ref={(e: HTMLElement) => this.pageContainer = e || this.pageContainer}>
            </div>
        </div>
    }

}