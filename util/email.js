const nodeMailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

class SendMail {
  constructor(email, subject) {
    this.to = email;
    this.subject = subject;
    this.from = process.env.EMAIL_GRID_FROM;
  }

  injectDataToTemplate() {
    return pug.renderFile(`${__dirname}/../views/mail.pug`, {
      myHost: process.env.HOST,
    });
  }

  newTransport() {
    return nodeMailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.EMAIL_GRID_USER,
        pass: process.env.EMAIL_GRID_PASSWORD,
      },
    });
  }

  async send(filename) {
    const html = this.injectDataToTemplate();

    const mailOptions = {
      from: process.env.EMAIL_GRID_FROM,
      to: this.to,
      attachments: {
        filename,
        path: `${__dirname}/../${filename}`,
      },
      subject: this.subject,
      html: html,
      text: htmlToText(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }
}

module.exports = SendMail;
