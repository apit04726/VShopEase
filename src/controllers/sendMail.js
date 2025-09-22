const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'hank.labadie@ethereal.email',
        pass: 'HTZ6CeJTxDQpDpYz82'
    }
});

  let info = await transporter.sendMail({
    from: '"vishu <apit04726@gmail.com>', 
    to: "vishalbaria7099@gmail.com", 
    subject: "Hello ", 
    text: "Hello visu", 
    html: "<b>Hello visu</b>",
  });

  console.log("Message sent: %s", info.messageId);
  res.json(info);
};

module.exports = sendMail;  