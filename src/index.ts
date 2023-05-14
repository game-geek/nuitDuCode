import express = require("express");
import { addUser } from "./routes/db";
import userRouter from "./routes/users";
import path = require("path");

const app = express();

console.log("starting...");
addUser("barnabas", "123456", 0).then((res: any) => console.log("res", res));
console.log("next...");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/users", userRouter);

app.listen(3000);
