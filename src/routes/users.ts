import express = require("express");
import { v4 as uuidv4 } from "uuid";
import { addUser, getUsers, updateUser, checkAccount } from "./db";

const router = express.Router();
router.use(logger);

const scores = {};

// fetch('http://localhost:3000/users/update', {

//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         username: "isaac",password: '381aa789-b828-4273-8e97-0e222cd09d62', score: 101
//     })
// })
// .then(res => {
//     if (res.ok){
//         console.log("SUCCESS");return res.json();
//     } else {
//         console.log("NOT SUCCESSFUL")
//     }
// })
// .then(data => (console.log(data)))
// .catch(error => console.log("ERROR"))
// ::::::
// fetch("http://localhost:3000/users")
//   .then((res) => {
//     if (res.ok) {
//       console.log("SUCCESS");
//       return res.json();
//     } else {
//       console.log("NOT SUCCESSFUL");
//     }
//   })
//   .then((data) => console.log(data))
//   .catch((error) => console.log("ERROR"));

router.get("/", async (req, res) => {
  const data = await getUsers();
  if (data) {
    res.send({ scores: data });
  } else {
    res.send("error");
  }
});

router.post("/username", async (req, res) => {
  const username = req.body.username;
  console.log("username", username);
  const password = uuidv4().slice(0, 6);

  const successful = await addUser(username, password, 0);
  if (successful) {
    console.log("new user created", { valid: true, password });
    res.send({ valid: true, password });
    return;
  } else {
    res.send({ valid: false, username });
    return;
  }
});
router.get("/test", async (req, res) => {
  res.send("ok");
});

router.post("/account", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (
    typeof username == typeof String() &&
    typeof password == typeof String()
  ) {
    const data = await checkAccount(username, password);
    if (data) {
      res.send({ valid: true, ...data });
      return;
    }
  }
  res.send({ valid: false, username });
  return;
});

router.post("/update", async (req, res) => {
  console.log(scores, "scores");
  const username = req.body.username;
  const password = req.body.password;
  const score = parseInt(req.body.score);
  if (
    typeof username == typeof String() &&
    typeof password == typeof String() &&
    typeof score == typeof Number()
  ) {
    const data = await updateUser(username, password, score);
    if (data) {
      res.send({ valid: true, score: data });
      return;
    }
  }
  res.send({ valid: false, username });
  return;
});

function update() {
  // scores.sort((a, b) => a.score - b.score);
}

router.param("id", (req, res, next, id) => {
  // req.user = users[id];
  next();
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

router.get("/new", async (req, res) => {
  let data = await getUsers();
  if (!data) {
    data = [];
  }
  res.render("users/display", { data });
});

export default router;
