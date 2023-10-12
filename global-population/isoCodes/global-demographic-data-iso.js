/*
@marieldelagarza (8/9/22) - This file is to pull out the ISO codes from the original
data file and the file from Jaehyun to compare them. 

Info for path module: https://nodejs.dev/learn/the-nodejs-path-module 
Info for fs module: https://nodejs.dev/learn/the-nodejs-fs-module 
*/

import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const isoCodes = [];
const uniqueCodes = [];

// Function to create a list of ISO codes from Jaehyun data
const createIsoList = () => {
  const input = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../originalData/global-demographic-data.json"),
      "utf-8"
    )
  );

  const makeIsoCodes = (input) => {
    for (let i = 0; i < input.length; i++) {
      isoCodes.push(input[i]["ISO3 Alpha-code"]);
    }
  };
  makeIsoCodes(input);

  isoCodes.forEach((element) => {
    if (!uniqueCodes.includes(element)) {
      uniqueCodes.push(element);
    }
  });

  /****Write data to new JSON file for copying****/
  const newData = JSON.stringify(uniqueCodes.sort());
  fs.writeFile("global-demographic-data-iso.json", newData, function (err) {
    if (err) throw err;
    console.log("complete");
  });
};
createIsoList();
