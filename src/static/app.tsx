import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Icons from "@ant-design/icons";
import Master from "./pages/master";
import ErrorPage from "./pages/error-page";
import { AsyncComponent } from "./components/async-component";
import 'antd/dist/antd.css';

type MyMenuItem = MenuItem & { icon: keyof typeof Icons };
let menuItems: MyMenuItem[] = [
  { id: "BEBA86B7-019E-4B3E-B823-3701C57779E6", name: "首页", icon: "HomeOutlined", path: "/" },
  {
    id: "02AFF1E9-82E2-46E1-89B2-A634C2A32F3B", name: "商品", icon: "OneToOneOutlined",
    children: [
      { id: "4F1F1120-1BBF-4DAB-BDFB-1257A1857028", name: "商品列表", path: "shopping/product-list" }
    ]
  }
]

const router = createBrowserRouter([
  {
    path: "/", element: <Master menuItems={menuItems} />, errorElement: <ErrorPage />,
    children: [
      {
        path: "aaa",
        element: <AsyncComponent loadModule={() => import("./pages/temp")} />
      },
      {
        path: "bbb",
        element: <AsyncComponent loadModule={() => import("./pages/temp")} />
      },
    ]
  }
])

export default class App extends React.Component {
  render(): React.ReactNode {
    return <RouterProvider router={router} />
  }
}
