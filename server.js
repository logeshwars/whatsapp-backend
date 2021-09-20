import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import Cors from "cors";
import message from "./router/messagerouter.js";
import group from "./router/grouprouter.js";
import user from "./router/userrouter.js";
import groupMessage from "./router/groupMessagerouter.js";
const app = express();
const port = process.env.PORT || 9000;
const connectionURL =
  "mongodb+srv://admin:UZRnwh3iAYd42som@cluster0.fz2yy.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connectionURL, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const pusher = new Pusher({
  appId: "1240667",
  key: "13e500ec0314a2ded124",
  secret: "71b19b9753761aa417c2",
  cluster: "ap2",
  useTLS: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log("changed");
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        receiver: messageDetails.receiver,
        sender: messageDetails.sender,
      });
    } else {
      console.log("error in trigger pushing");
    }
  });
});

app.use(express.json());
app.use(Cors());
app.use("/message", message);
app.use("/group", group);
app.use("/user", user);
app.use("/groupmessage", groupMessage);
app.listen(port, () => {
  console.log(`App listening on port ${port}! `);
});
