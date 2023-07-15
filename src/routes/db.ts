import { Pool } from "pg";
require("dotenv").config();

let pool = undefined;

if (Boolean(process.env.SSL)) {
  pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432,
    ssl: {},
  });
} else {
  pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432,
  });
}

console.log("pool", pool);
const usernameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;

export async function addUser(
  username: string,
  password: string,
  score: number
) {
  if (!usernameRegex.test(username)) return false;
  if (typeof password != typeof String("")) return false;
  if (typeof score != typeof Number(0)) return false;
  const _username = String(username);
  const _password = String(password);
  const _score = Number(score);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var time = String(today.getHours()) + ":" + String(today.getMinutes()) + ":" + String(today.getSeconds())
  const _date = mm + '-' + dd + '-' + yyyy + " " + time

  try {
    const exists = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [_username]
    );
    if (exists?.rows.length == 0) {
      // can create the user!
      const query = await pool.query(
        "INSERT INTO users (username, password, score, created_at) VALUES($1, $2, $3, $4) RETURNING id",
        [_username, _password, _score, _date]
      );
      console.log(query.rows);
    } else {
      return false;
    }
  } catch (err) {
    console.log("error", err);
    return false;
  }
  return true;

  // const query = await pool
  //   .query(
  //     `INSERT INTO users (username, password, score, created_at) VALUES('${username}','${password}', 0, '12-05-2023')`
  //   )
}

export async function getUsers() {
  try {
    const query = await pool.query(
      "SELECT username, score FROM users ORDER BY score DESC LIMIT 5"
    );
    return query.rows;
  } catch (err) {
    console.log("error", err);
    return false;
  }
}

export async function checkAccount(username: string, password: string) {
  if (typeof username != typeof String("")) return false;
  if (typeof password != typeof String("")) return false;
  const _username = String(username);
  const _password = String(password);
  try {
    const query = await pool.query(
      "SELECT score FROM users WHERE username =  $1 AND password = $2;",
      [_username, _password]
    );
    if (query.rows.length) {
      return query.rows[0];
    } else {
      return false;
    }
  } catch (err) {
    console.log("error", err);
    return false;
  }
}

export async function updateUser(
  username: string,
  password: string,
  score: number
) {
  if (typeof username != typeof String("")) return false;
  if (typeof password != typeof String("")) return false;
  if (typeof score != typeof Number(0)) return false;
  const _username = String(username);
  const _password = String(password);
  const _score = Number(score);
  try {
    const query = await pool.query(
      "UPDATE users SET score = $1 WHERE username = $2 AND password = $3 RETURNING score",
      [_score, _username, _password]
    );
    if (query.rows.length) {
      return query.rows[0];
    } else {
      return false;
    }
  } catch (err) {
    console.log("error", err);
    return false;
  }
}


export async function updateFeedbackAiTankGame(email: string, username: string, liked: boolean, feedback: string) {
  if (typeof username != typeof String("")) return false;
  if (typeof email != typeof String("")) return false;
  if (typeof liked != typeof Boolean(0)) return false;
  if (typeof feedback != typeof String("")) return false;
  const _username = String(username);
  const _email = String(email);
  const _liked = Boolean(liked);
  const _feedback = String(feedback)
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var time = String(today.getHours()) + ":" + String(today.getMinutes()) + ":" + String(today.getSeconds())
  const _date = mm + '-' + dd + '-' + yyyy + " " + time
  try {

    const query = await pool.query(
      "INSERT INTO feedback_ai_tank_game (email, username, liked, created_at, feedback) VALUES($1, $2, $3, $4, $5)",
      [ _email, _username, _liked, _date, _feedback]
    );
    return true
  } catch (err) {
    return false;
  }
}