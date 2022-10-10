import * as React from "react";
import { Button, Layout, Result } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    let navigate = useNavigate();
    const error = useRouteError() as any;
    console.error(error);
    return <Layout>
        <Content>
            <Result
                status={error.status}
                title={error.status}
                subTitle={error.statusText}
                extra={
                    <Button type="primary" onClick={() => navigate("/")} >
                        Back Home
                    </Button>
                }
            />
        </Content>
    </Layout>
}