//import ics from 'ics';
//import uuidv4 from 'uuid/v4';
//import fs from 'fs';
//import {promisify} from 'util';

const {promisify} = require('util')
const ics = require('ics')
const fs = require('fs')
const uuidv4 = require('uuid/v4')
const filenamify = require('filenamify');

const readFileAsync = promisify(fs.readFile)

// const events = [
//   {
//     title:    'First event',
//     start:    [2018, 5, 30, 6, 30],
//     duration: {hours: 1},
//     uid:      uuidv4() // generate a unique ID
//   },
//   {
//     title:    'Second event',
//     start:    [2018, 6, 30, 6, 30],
//     duration: {minutes: 30},
//     uid:      uuidv4()
//   }
// ]
//


function extractTime(timeString) {
  let date = new Date(timeString)
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  ]
}


function mapObjToEvent(obj) {
    if(obj.Rooms)
  return {
    title: obj.Title.trim(),
    start: extractTime(obj.SessionStartTime),
    end:   extractTime(obj.SessionEndTime),
    location: obj.Rooms.join(' and '),
    uid:   uuidv4()
  }
}

async function readInput() {
  let names
  try {
    text = await readFileAsync('codemash.json', {encoding: 'utf8'})
  } catch (e) {
    console.log('Reading file got error', e)
  }
  if (text === undefined) {
    console.log('CONTENT is undefined')
  } else {
    return JSON.parse(text)
  }
}

const writeEvent = (event) => {
  let fileName = filenamify(event.title)
  console.log(`Writing ${fileName}`)
  ics.createEvent(event, (error, value) => {
    if (error) throw error

    fs.writeFile(`events/${fileName}.ics`, value, (error) => {
      if (error) throw error
    })
  })
  return event
}

const writeEvents = (events) => {
  let fileName = 'CODEMASH2018'
  console.log(`Writing ${fileName}`)
  ics.createEvent(events, "PRODID", (error, value) => {
    if (error) throw error

    fs.writeFile(`events/${fileName}.ics`, value, (error) => {
      if (error) throw error
    })
  })
  return events
}

async function doIt() {
  let allObjects = await readInput()
  let events = allObjects
      .map(mapObjToEvent)
  writeEvents(events)
}

doIt()
// Next steps:
// [x] JSON.parse text
// [ ] Convert object to event format
// [x] Write files to events directory using commented code
// [ ] Get fancy with promisify, Async Await, write tests, or whatever
