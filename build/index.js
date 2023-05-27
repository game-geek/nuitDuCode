"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("./routes/db");
var users_1 = require("./routes/users");
var path = require("path");
var cors = require("cors");
var corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
var app = express();
console.log("starting...");
(0, db_1.addUser)("barnabas", "123456", 0).then(function (res) { return console.log("res", res); });
console.log("next...");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions)); // Use this after the variable declaration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/users", users_1.default);
app.listen(3000);
