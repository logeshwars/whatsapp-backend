import express from "express";
import message from "../models/message.js";
import user from "../models/users.js";
const router = express.Router();
const app = express();
app.use(express.json());
router.get("/get", (req, res) => {
  const users = req.body;
user.find({ user: users.user }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(users);
    }
  });
});
router.post("/update", (req, res) => {
  const dbUser = req.body;
  user.findOneAndUpdate(
    { user: dbUser.user },
    { $set: dbUser },
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

router.post("/removecontact", (req, res) => {
  const contact = req.body;
  user.findAndModify(
    { user: contact.user},
    { $pull: { contact: contact.friend } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});
router.post("/addcontact", (req, res) => {
  const contact = req.body;
  user.findOneAndUpdate(
    { user: contact.user },
    { $push: { contact: contact.friend } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});
export default router;
