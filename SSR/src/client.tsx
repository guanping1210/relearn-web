import { Routes } from "@/routes";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

function ClientRender() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

ReactDOM.hydrate(<ClientRender />, document.getElementById("root"));
