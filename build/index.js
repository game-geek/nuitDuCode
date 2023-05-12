"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("./routes/db");
var users_1 = require("./routes/users");
var app = express();
console.log("starting...");
(0, db_1.addUser)("barnabas", "123456", 0).then(function (res) { return console.log("res", res); });
console.log("next...");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use("/users", users_1.default);
app.listen(3000);
