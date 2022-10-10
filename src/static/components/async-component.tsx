import { Spin } from "antd";
import * as React from "react";
import { useParams } from "react-router-dom";
import { errors } from "../errors";

interface Props {
    loadModule: () => Promise<any>,
    match?: {
        params: any
    }
}

interface State {
    element?: React.ReactElement<any, any>
}

interface ComponentModule {
    default: React.ComponentClass | React.FunctionComponent,
    loadProps: (params: any) => Promise<any>
}

export function AsyncComponent(props: Props) {
    if (!props.loadModule) throw errors.argumentFieldNull("loadModule", "props");

    let [state, setState] = React.useState({} as State);

    let params = useParams();
    React.useEffect(() => {
        props.loadModule().then(async (o: ComponentModule) => {
            let componentType = o.default;
            let props: any = {};
            if (o.loadProps != null) {
                props = await o.loadProps(params);
            }
            let element = React.createElement(componentType, props);
            setState({ element });

        })
    }, [])


    if (!state.element) {
        return <Spin tip="组件正在加载中..." size="large" style={{ width: "100%", paddingTop: 100 }}>

        </Spin>
    }

    return state.element;
}

