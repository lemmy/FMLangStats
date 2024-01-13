"use strict"

// const fs = require("fs")

// function removeDuplicatesAndKeepHighestCount(data) {
//     const maxCountTriplets = {};
//     const filteredData = [];

//     // First, find the maximum count for each unique triplet
//     data.forEach(event => {
//         const triplet = `${event.name}-${event.year}-${event.quarter}`;
//         const count = parseInt(event.count, 10);
//         if (!maxCountTriplets[triplet] || maxCountTriplets[triplet] < count) {
//             maxCountTriplets[triplet] = count;
//         }
//     });

//     // Then, filter the data to keep only the entries with the maximum count
//     const seenTriplets = new Set();
//     data.forEach(event => {
//         const triplet = `${event.name}-${event.year}-${event.quarter}`;
//         const count = parseInt(event.count, 10);
//         if (!seenTriplets.has(triplet) && count === maxCountTriplets[triplet]) {
//             filteredData.push(event);
//             seenTriplets.add(triplet);
//         }
//     });

//     return filteredData;
// }

// // Read JSON data from file
// const jsonData = JSON.parse(fs.readFileSync('../src/data/gh-total-event.json', 'utf8'));

// // Process the data
// const removedDupes = removeDuplicatesAndKeepHighestCount(jsonData);
// fs.writeFileSync('../src/data/gh-total-request.json', removedDupes);


const fs = require('fs');

// Read the JSON file
const filePath = '../src/data/gh-total-event.json';
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Function to remove duplicates and keep the one with the highest count
function removeDuplicates(data) {
  let maxCountTriples = {};
  let filteredData = [];
  let seenTriples = new Set();

  // Find the maximum count for each triplet while keeping count as a string
  data.forEach(event => {
    let triple = [event.name, event.year, event.quarter].join('-');
    let countInt = parseInt(event.count);
    if (!maxCountTriples[triple] || countInt > parseInt(maxCountTriples[triple])) {
      maxCountTriples[triple] = event.count;
    }
  });

  // Filter data to keep only the entries with the maximum count for each triplet
  data.forEach(event => {
    let triple = [event.name, event.year, event.quarter].join('-');
    if (!seenTriples.has(triple) && event.count === maxCountTriples[triple]) {
      filteredData.push(event);
      seenTriples.add(triple);
    }
  });

  return filteredData;
}

// Remove duplicates from data
let filteredData = removeDuplicates(data);

// Write the filtered data back to the same JSON file
fs.writeFileSync(filePath, JSON.stringify(filteredData, null, 2), 'utf8');
console.log(`Filtered data written to ${filePath}`);
