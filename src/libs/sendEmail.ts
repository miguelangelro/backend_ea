import nodemailer from 'nodemailer'


export const sendEmail = async (options: { email: any; subject: any; message: any; html: any; }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port:465,
    secure:true,
    auth: {
      user: "appgymder@gmail.com",
      pass: "appgymder.2021"
    }
  });

  const message = {
    from: "appgymder@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};