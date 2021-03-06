import express from "express";
import group from "../models/group.js";
import Cors from "cors";
const router = express.Router();
const app = express();
app.use(Cors());
app.use(express.json());
router.post("/new", (req, res) => {
  const dbgroup = req.body;
  group.create(dbgroup, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
router.post("/update", (req, res) => {
  const groupbody = req.body;
  group.findOne({ _id: groupbody._id }, { admin: 1 }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      group.findOneAndUpdate({ _id: groupbody._id }, groupbody, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(data);
        }
      });
    }
  });
});
router.get("/get", (req, res) => {
  let checkGroupMember = req.query;
  group.find({ members: { $in: [checkGroupMember.user] } }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
router.post("/removemember", (req, res) => {
  const member = req.body;
  group.findOneAndUpdate(
    { _id: member.id },
    { $pull: { members: member.member } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});
router.post("/addmember", (req, res) => {
  const member = req.body;
  group.findOneAndUpdate(
    { _id: member.id },
    { $push: { members: member.new } },
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
