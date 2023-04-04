const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const fs = require("fs");
const port = 3001;

const db = require("./mongoose");
const Patient = require("./patient/patient");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/signup.html");
// });

app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/form", function (req, res) {
  res.sendFile(__dirname + "/form.html");
});

app.get("/faq", function (req, res) {
  res.sendFile(__dirname + "/faq.html");
});

app.get("/symptoms", function (req, res) {
  res.sendFile(__dirname + "/symptoms.html");
});

app.post("/signup", function (req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/4ab9a1409c";
  const options = {
    method: "POST",
    auth: "ascs25835:c0689a017fd5b3fcc2b56f5251f8e08b-us21",
  };

  https.request(options, function (error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
      return;
    } else {
      if (response.statusCode != 200) {
        res.sendFile(__dirname + "/failure.html");
      } else {
        res.sendFile(`${__dirname}/success.html`);
      }
    }
  });
});

app.post("/", function (req, res) {
  res.redirect("/");
});

app.post("/form", function (req, res) {
  Patient.create({
    name: req.body.name,
    pname: req.body.name,
    phone: req.body.phone,
    mail: req.body.mail,
    medicalConditions: req.body.medicalConditions,
    symptoms: req.body.symptoms,
  })
    .then((newPatient) => {
      console.log("Contact created successfully:", newPatient);
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in creating a contact!", err);
      return;
    });
});

app.listen(port, function (err) {
  if (err) {
    res.sendFile(__dirname + "/failure.html");
    return;
  } else console.log("Running on port ", port);
});

// c0689a017fd5b3fcc2b56f5251f8e08b-us21
// 4ab9a1409c
// api.openweathermap.org/data/2.5/weather?q=London&appid=18d3c9ee3ae4c24262c895855f34b46d&units=metric
