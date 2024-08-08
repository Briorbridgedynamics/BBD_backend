const express = require("express");
const { connection } = require("./connectMongo");
const cors = require("cors");
const { addVisitor } = require("./services/addVisitor");
const nodemailer = require("nodemailer");
const { getVisitor } = require("./services/getVisitor");
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
app.options("*", cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.get("/visitor", async (req, res) => {
  try {
    const data = await getVisitor();
    res.send({
      status: "Success",
      data: data,
    });
  } catch (e) {
    res.send({
      status: "Error",
      data: e,
    });
  }
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
    //  console.log(req.body);
    // const data=JSON.stringify(req.body);
    const mailOptions = {
      from: process.env.EMAIL,
      to: "sohomsaha361@gmail.com",
      subject: `Enqiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nDate: ${date}\nPhone Number: ${contact}\nEnquiry Services: ${services}\nComments: ${comments}`,
    };

    await transporter.sendMail(mailOptions);
    res.send({
      status: "success",
      data: visitor,
    });
  } catch (err) {
    res.send({
      status: "ERROR",
      data: err,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
