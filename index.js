const express = require("express");
const { connection } = require("./connectMongo");
const cors = require("cors");
const bcrypt = require('bcrypt');

const { addVisitor } = require("./services/addVisitor");
const nodemailer = require("nodemailer");
const { getVisitor } = require("./services/getVisitor");
const { authenticate } = require("./middleware/auth");
const { addAdmin } = require("./services/addAdmin");
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

app.use("/visitor",authenticate, async (req, res) => {
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

app.post("/admin",async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const saltRounds = 10;
    const pass = await bcrypt.hash(password, saltRounds);
    const admin = await addAdmin(
      email,
      pass
    );
    const mailOptions = {
      from: process.env.EMAIL,
      to: "sohomsaha361@gmail.com",
      subject: `New Admin Added ${email}`,
      text: `APPROVAL PENDING`,
    };

    await transporter.sendMail(mailOptions);
    res.send({
      status: "success",
      data: admin,
    });
  } catch (err) {
    res.send({
      status: "ERROR",
      data: err,
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
