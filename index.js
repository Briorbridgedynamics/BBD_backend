const express = require("express");
const { connection } = require("./connectMongo");
const cors = require("cors");
const { addVisitor } = require("./services/addVisitor");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
connection(process.env.uri)
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.log("Error in MongoDB connection", err);
  });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Success baby");
});

app.post("/form", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const date = req.body.date;
  const contact = req.body.contact;
  const comments = req.body.comments;
  const services = req.body.services;
  try {
    const visitor = await addVisitor(
      name,
      email,
      date,
      contact,
      comments,
      services
    );
    res.send({
      status: "success",
      data: visitor,
    });
  } catch (err) {
    res.send({
      status: "success",
      data: err,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
