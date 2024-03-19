const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "martinprado1000@gmail.com",
    pass: "renb bqzb dehj tpvs",
  },
});

const sendMailRecoveryPassword = async (email , newPassword) => {
  const result = await transporter.sendMail({
    from: "martinprado1000@gmail.com",
    to: email,
    subject: "Recuperacion de contraseña",
    html: `<div>
                <h1>La nueva contraseña para el usuario ${email} es: ${newPassword}</h1>
            </div>`,
    // attachments: [
    //   {
    //      filename: 'chems.PNG',
    //      path: './src/chems.PNG',
    //      cid: 'chems'
    //   },
    // ],
  });
  //console.log(result);
  return { status: "success", result: "mail enviado" };
};

module.exports = { sendMailRecoveryPassword };
