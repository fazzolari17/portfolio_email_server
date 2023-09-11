import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'gmail',
  // host: 'smtp.forwardemail.net',
  // port: 465,
  // secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'fazzolari17@gmail.COM',
    pass: 'smqtixhrelxjlgyl',
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(contactInfo) {
  const { name, email, message } = contactInfo;


  const newLocal = `
  <hr>
  <h2>Contact Name</h2>
  <p>${name}<p>
  <hr>
  <h2>Email Address<h2>
  <p>${email}</p>
  <hr>
  <h2>Message<h2>
  <p>${message}</p>
  <hr>
  `
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'fazzolari17@gmail.com', // list of receivers
    subject: `New Message from Portfolio Website from ${name} at ${email}`, // Subject line
    // text: 'Hello world?', // plain text body
    // html: '< b > Hello world?</b> ', // html body
    html: newLocal
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Message sent: %s', info.envelope);
  return { 'Message': info.messageId };

}

// Remove this after it is working coorectly
// main().catch(console.error);

export default main;
