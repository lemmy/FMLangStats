"use strict"

const fs = require("fs")
    

function splitEvents(jsonData) {
    const pullEvents = [];
    const pushEvents = [];
    const issueEvents = [];
    const starEvents = [];

    jsonData.forEach(item => {
        const { name, year, quarter } = item;
        
        pullEvents.push({ name, year, quarter, count: item.pull_events });
        pushEvents.push({ name, year, quarter, count: item.push_events });
        issueEvents.push({ name, year, quarter, count: item.issue_events });
        starEvents.push({ name, year, quarter, count: item.star_events });
    });

    const pullEventsJson = JSON.stringify(pullEvents, null, 2);
    const pushEventsJson = JSON.stringify(pushEvents, null, 2);
    const issueEventsJson = JSON.stringify(issueEvents, null, 2);
    const starEventsJson = JSON.stringify(starEvents, null, 2);

    fs.writeFileSync('../src/data/gh-pull-request.json', pullEventsJson);
    fs.writeFileSync('../src/data/gh-push-event.json', pushEventsJson);
    fs.writeFileSync('../src/data/gh-issue-event.json', issueEventsJson);
    fs.writeFileSync('../src/data/gh-star-event.json', starEventsJson);
}

// Read JSON data from file
const jsonData = JSON.parse(fs.readFileSync('../src/data/gh-total-event.json', 'utf8'));

// Process the data
splitEvents(jsonData);
