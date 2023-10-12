/*
@marieldelagarza (8/9/22) - This file is to read in a .xlsx file, turn it into
.json, and send that .json to a new .json file. 

It uses the `xlsx` npm library found here:
https://www.npmjs.com/package/xlsx?activeTab=readme

For additional XLSX reference: https://www.geeksforgeeks.org/how-to-read-and-write-excel-file-in-node-js/ 

Info for fs module: https://nodejs.dev/learn/the-nodejs-fs-module 
*/

/************Imports************/
// import fs to use node to read and write files
import fs from "fs";
// import XLSX to read Excel file
import * as XLSX from "xlsx/xlsx.mjs";

/************Setting up XLSX use************/
// load 'fs' for readFile and writeFile support */
XLSX.set_fs(fs);

// pull in spreadsheet
const file = XLSX.readFile(
  "/Users/marieldelagarza/Desktop/csis/global-population/Global_Population_2021 _and_onward.xlsx"
);
// literally just the sheet names
const sheets = file.SheetNames;

/************Parsing************/
// declare an arraay to hold your new json
let data = [];

// XLSX magic turning the spredsheet into json and pushing it to your data array
for (let i = 0; i < sheets.length; i++) {
  const temp = XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    data.push(res);
  });
}

// stringify your new array to prepare for sending to its own file
// (make sure you've also created the empty .json file you'll use)
const newData = JSON.stringify(data);

// send your new json to its own file
fs.writeFile("global-demographic-data.json", newData, function (err) {
  if (err) throw err;
  console.log("complete");
});
