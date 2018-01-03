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

function cleanDescription(description) {
  return description.replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/:/g, "\\:")
}

function mapObjToEvent(obj) {
  let url = `http://www.codemash.org/sessions/?id=${obj.Id}`
  let description = `${cleanDescription(obj.Abstract.trim())}\\n${cleanDescription(url)}`
  return {
    title: obj.Title.trim(),
    description,
    url,
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
  ics.createEvent([event], "PRODID", (error, value) => {
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
      .map(writeEvent)
  writeEvents(events)
}

doIt()
// Next steps:
// [x] JSON.parse text
// [ ] Convert object to event format
// [x] Write files to events directory using commented code
// [ ] Get fancy with promisify, Async Await, write tests, or whatever
