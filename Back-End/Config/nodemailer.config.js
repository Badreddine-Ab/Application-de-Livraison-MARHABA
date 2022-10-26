
const nodemailer = require("nodemailer");
const config = require("dotenv");


const user = process.env.user;
const pass = process.env.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user,
    pass
  },
});

module.exports.sendConfirmationEmail = (name, email,link) => {
    console.log("Email sent");
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p> Please confirm your email by clicking on the following link</p>
          <a href=${link}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };