import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Email } from 'meteor/email'

import { Tasks } from '../api/tasks.js';
 
import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});
 
Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
  checkPlural(){
    if ((Tasks.find({ checked: { $ne: true } }).count()) == 1) {
      return 'thing'
    } else {
      return 'things'
    }
  }
});

Template.body.events({
  'submit .mail'(event) {
    event.preventDefault();

    const target = event.target;
    const mail = target.mail.value;
    const from = 'charlottetreuse42@gmail.com'
    // console.log("mail", event.target.mail.value)

    if (mail == '') {
      alert('please enter a valid email adress');
      throw new Meteor.Error('empty mail');
    }
    
    //Send mail
    //to, from, subject, text
    Meteor.call(
      'sendEmail',
      mail,
      from,
      'Hello from Meteor!',
      'Somebody wants to share this todo list with you: https://url.com',
      console.log("send")
    );

    // Clear form
    target.mail.value = '';
  },
  
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    console.log("event", event)
    console.log("event target", event.target)
    console.log("text", event.target.text)
    console.log("value", event.target.text.value)
    
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Meteor.call('tasks.insert', text);
 
    // Clear form
    target.text.value = '';
  },

  // Updates the ReactiveDict
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});

