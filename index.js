//import ics from 'ics';
//import uuidv4 from 'uuid/v4';
//import fs from 'fs';
//import {promisify} from 'util';

const {promisify} = require('util')
const ics = require('ics')
const fs = require('fs')
const uuidv4 = require('uuid/v4')

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
// events.map((event) => {
//   ics.createEvent(event, (error, value) => {
//     if (error) throw error
//
//     fs.writeFile(`events/${event.uid}.ics`, value, (error) => {
//       if (error) throw error
//     })
//   })
// })

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
  return {
    title: obj.Title,
    start: extractTime(obj.SessionStartTime),
    end:   extractTime(obj.SessionEndTime),
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

const writeEvent = (error, value) => {
  if (error) throw error

  fs.writeFile(`events/${value.uid}.ics`, value, (error) => {
    if (error) throw error
  })
}

async function doIt() {
  let allObjects = await readInput()
  let events = allObjects
      .map(mapObjToEvent)

  console.log(events[0])
}

doIt()
// Next steps:
// [x] JSON.parse text
// [ ] Convert object to event format
// [ ] Write files to events directory using commented code
// [ ] Get fancy with promisify, Async Await, write tests, or whatever
