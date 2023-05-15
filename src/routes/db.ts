import { Pool } from "pg";
require('dotenv').config();

let pool = undefined

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
	  port: 5432
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

  try {
    const exists = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [_username]
    );
    if (exists?.rows.length == 0) {
      // can create the user!
      const query = await pool.query(
        "INSERT INTO users (username, password, score, created_at) VALUES($1, $2, $3, '12-05-2023') RETURNING id",
        [_username, _password, _score]
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
