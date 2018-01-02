# CodeMash2iCalendar
Utility to convert the CodeMash Session Schedule json into iCalendar (ICS)


### Generate input files

Hrmm... `curl -H "Content-Type: application/json" https://cmprod-speakers.azurewebsites.net/api/sessionsdata | jq .` gets the Codemash Session list.

### Convert Input files to ICS files 

Node [ICS](https://github.com/adamgibbons/ics) library has a nifty little [wiki page on creating multiple events](https://github.com/adamgibbons/ics/wiki/Creating-multiple-events).
