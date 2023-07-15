import express = require("express");
import { v4 as uuidv4 } from "uuid";
import { updateFeedbackAiTankGame } from "./db";

const router = express.Router();


router.post("/feedback_ai_tank_game", async (req, res) => {
    console.log(req.body, "scores");
    const username = req.body.username;
    const email = req.body.email;
    const liked = req.body.liked || req.body.liked == "true" ? true : false;
    const feedback = req.body.feedback || "";
    if (
      typeof username == typeof String() && username.length > 0 &&
      typeof email == typeof String() && email.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i)&&
      typeof liked == typeof Boolean() &&
      typeof feedback == typeof String() && 
      feedback.length < 20000
    ) {
      const data = await updateFeedbackAiTankGame(email, username, liked, feedback);
      if (data) {
        res.status(200);
          res.send('Thank You!');
          return
      } else {
        res.status(400);
        res.send('you alwready submitted this form (same email)');
        return;
      }
        
    } else {
        res.status(417);
        res.send('You didnt meet the form expectations, hacker !!');
        return;
    }
});


export default router;
