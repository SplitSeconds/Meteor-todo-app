import '../imports/api/tasks.js';
import { Email } from 'meteor/email'

// Meteor.startup(function() {
//   process.env.MAIL_URL = 'smtp://waquar:pass123@smtp.gmail.com:587/'
// });

Meteor.methods({
  sendEmail(to, from, subject, text) {
    // Make sure that all arguments are strings.
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});