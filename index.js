const ics = require('ics')
const fs = require('fs')
const uuidv4 = require('uuid/v4')

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

events.map((event) => {
  ics.createEvent(event, (error, value) => {
    if (error) throw error

    fs.writeFile(`events/${event.uid}.ics`, value, (error) => {
      if (error) throw error
    })
  })
})
