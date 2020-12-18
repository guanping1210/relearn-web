import { Routes } from "@/routes";
import * as React from "react";
import { StaticRouter } from "react-router";

function ServerRender(req, context) {
  return (props) => {
    return (
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>
    );
  };
}

export default ServerRender;
