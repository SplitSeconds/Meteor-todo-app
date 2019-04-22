import '../imports/api/tasks.js';
import { Email } from 'meteor/email'

Meteor.startup(function() {
  // user: 'charlottetreuse42@gmail.com',
  //         pass: 'chartreuse' 
  // process.env.MAIL_URL = "smtps://postmaster%40sandboxd17929d62e7d48a69f38b05e8ffd0e40.mailgun.org:d3a1e4e3c099df18b2d461de8da7f62b-dc5f81da-7c1cfdb2@smtp.mailgun.org:587";
  process.env.MAIL_URL = "smtp://charlottetreuse42%40gmail.com:chartreuse@smtp.gmail.com:587";
});

Meteor.methods({
  sendEmail(to, from, subject, text) {
    // Make sure that all arguments are strings.
    //check([to, from, subject, text], [String]);

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