import express from "express";
import message from "../models/message.js";
import Cors from 'cors';
const router  = express.Router();
const app = express();
app.use(express.json());
app.use(Cors());
router.post("/new", (req, res) => {
  const dbMessage = req.body;
  message.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
router.get("/get", (req, res) => {
  const messages = req.body;
  message.find(
    {
      $or: [
        { $and: [{ sender: messages.user }, { receiver: messages.receiver }] },
        { $and: [{ sender: messages.receiver }, { receiver: messages.user }] },
      ],
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

export default router;