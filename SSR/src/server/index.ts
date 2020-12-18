import express from "express";
import path from "path";
import * as React from "react";
import ReactDOMServer from "react-dom/server";

const serverBuild = require("../distServer").default;

const manifest = require("../distClient/");
