import express from "express";
const app = express();
import Cors from "cors";
import bodyParser from "body-parser";
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const port = process.env.PORT || 9000;
app.use(express.json());
app.use(Cors());
app.get("/", (req, res) => {
  res.status(200).send("hello");
});
app.post("/message/new",(req,res)=>{
    const data = req.body;
    res.status(201).send(data);
});
app.listen(port, () => {
  console.log(`App listening on port ${port}! `);
});