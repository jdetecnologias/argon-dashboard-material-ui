/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Soft UI Context Provider
import { ArgonControllerProvider } from "context";

// react-perfect-scrollbar component
import PerfectScrollbar from "react-perfect-scrollbar";

// react-perfect-scrollbar styles
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/css/main.css";
import { RecoilRoot } from "recoil";
import Default from "layouts/dashboard";
import App2 from "App2";
const container = document.getElementById("root");
const root = createRoot(container);
// <App />
root.render(
    <BrowserRouter>
      <ArgonControllerProvider>
        <PerfectScrollbar>
        <RecoilRoot>
           <App/>
        </RecoilRoot>
        </PerfectScrollbar>
      </ArgonControllerProvider>
    </BrowserRouter>
);
