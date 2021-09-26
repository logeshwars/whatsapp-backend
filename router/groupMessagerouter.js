import express from "express";
import groupmessage from "../models/groupMessage.js";
import Cors from "cors";
const router = express.Router();
const app = express();
app.use(Cors());
app.use(express.json());
router.post("/new", (req, res) => {
  const groupMessage = req.body;
  groupmessage.create(groupMessage, (error, data) => {
    if (error) {
      res.status(500).send(err);
    } else {
      res.status(200);
    }
  });
});
router.get("/get", (req, res) => {
  const groupId = req.query.id;
  groupmessage.find({ _id: groupId }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
export default router;
