import React from "react";
import ReactDOM from "react-dom/client";
import { PageScripts } from "./pages/PageScripts/PageScripts.jsx";
import { PageCod } from "./pages/PageCod/PageCod.jsx";
import { PageSs } from "./pages/PageSs/PageSs.jsx";
import { PageCrypto } from "./pages/PageCrypto/PageCrypto.jsx";
import { PageStudy } from "./pages/PageStudy/PageStudy.jsx";
import { PageSetting } from "./pages/PageSetting/PageSetting.jsx";
import { PageGeneral } from "./pages/PageGeneral/PageGeneral.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MyProvider, useMyContext } from "./context/MyContext/MyContext.jsx";

const router = createBrowserRouter([
  {
    path: "/ScriptHelper2",
    element: <PageScripts />,
    errorElement: <div>404 not found this page</div>,
  },
  {
    path: "/ScriptHelper2/cod",
    element: <PageCod />,
  },
  {
    path: "/ScriptHelper2/ss",
    element: <PageSs />,
  },
  {
    path: "/ScriptHelper2/crypto",
    element: <PageCrypto />,
  },
  {
    path: "/ScriptHelper2/study",
    element: <PageStudy />,
  },
  {
    path: "/ScriptHelper2/setting",
    element: <PageSetting />,
  },
  {
    path: "/ScriptHelper2/general",
    element: <PageGeneral />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </MyProvider>
);
