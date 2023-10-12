/*
@marieldelagarza (8/9/22) - This file is to pull out the ISO codes from the original
data file and the file from Jaehyun to compare them. 

Info for path module: https://nodejs.dev/learn/the-nodejs-path-module 
Info for fs module: https://nodejs.dev/learn/the-nodejs-fs-module 
*/

import fs from "fs";
import path from "path";

const __dirname = path.resolve();

// from original data
const originalIsoCodes = [];

// Function to create a list of ISO codes from original data
const createOriginalIsoList = () => {
  const input = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../ne_110m_admin_0_countries_lakes.json"),
      "utf-8"
    )
  );

  // pull this out for readability in makeOriginalIsoCodes function
  let originalDataArray =
    input.objects.ne_110m_admin_0_countries_lakes.geometries;

  const makeOriginalIsoCodes = (originalDataArray) => {
    for (let i = 0; i < originalDataArray.length; i++) {
      originalIsoCodes.push(originalDataArray[i].properties.ISO_A3);
    }
  };
  makeOriginalIsoCodes(originalDataArray);

  /****Write data to new JSON file for copying****/
  const newData = JSON.stringify(originalIsoCodes.sort());

  fs.writeFile("observable-iso.json", newData, function (err) {
    if (err) throw err;
    console.log("complete");
  });
};
createOriginalIsoList();
