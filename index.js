//import ics from 'ics';
//import uuidv4 from 'uuid/v4';
//import fs from 'fs';
//import {promisify} from 'util';

const {promisify} = require('util');
const ics = require('ics')
const fs = require('fs')
const uuidv4 = require('uuid/v4')

const readFileAsync = promisify(fs.readFile);

const events = [
  {
    title: 'First event',
    start: [2018, 5, 30, 6, 30],
    duration: { hours: 1 },
    uid: uuidv4() // generate a unique ID
  },
  {
    title: 'Second event',
    start: [2018, 6, 30, 6, 30],
    duration: { minutes: 30 },
    uid: uuidv4()
  }
]

/*
events.map((event) => {
  ics.createEvent(event, (error, value) => {
    if (error) throw error

    fs.writeFile(`events/${event.uid}.ics`, value, (error) => {
      if (error) throw error
    })
  })
})
*/





async function readInput() {
  let names;
  try {
    text = await readFileAsync('codemash.json', {encoding: 'utf8'});
    if (err) {
        // Handle the error.
    }
  } catch (e) {
    console.log('Reading file got error', e);
  }
  if (text === undefined) {
    console.log('CONTENT is undefined');
  } else {
    console.log('CONTENT:', text));
  }
}

readInput();
// Next steps:
// JSON.parse text
// Convert object to event format
// Write files to events directory using commented code
// Get fancy with promisify, Async Await, write tests, or whatever 
