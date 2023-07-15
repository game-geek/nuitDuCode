import express = require("express");
import { addUser } from "./routes/db";
import userRouter from "./routes/users";
import statsRouter from "./routes/stats";
import path = require("path");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

console.log("starting...");
addUser("barnabas", "123456", 0).then((res: any) => console.log("res", res));
console.log("next...");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions)); // Use this after the variable declaration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/users", userRouter);
app.use("/stats", statsRouter)

app.listen(3050);
