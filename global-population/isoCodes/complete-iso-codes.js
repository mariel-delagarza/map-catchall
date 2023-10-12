/*
@marieldelagarza (8/9/22) - This file is to pull out the ISO codes from the original
data file and the file from Jaehyun to compare them. 

Info for path module: https://nodejs.dev/learn/the-nodejs-path-module 
Info for fs module: https://nodejs.dev/learn/the-nodejs-fs-module 
*/

import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const uniqueCodes = [];

// Function to create a list of ISO codes from Jaehyun data
// Use file for a specific year to avoid duplicates present in original file
const createCompleteIsoList = () => {
  const globalDemographicDataIso = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "global-demographic-data-iso.json"),
      "utf-8"
    )
  );

  const observableIso = JSON.parse(
    fs.readFileSync(path.join(__dirname, "observable-iso.json"), "utf-8")
  );

  const allCodes = globalDemographicDataIso.concat(observableIso);

  allCodes.forEach((element) => {
    if (!uniqueCodes.includes(element)) {
      uniqueCodes.push(element);
    }
  });

  /****Write data to new JSON file for copying****/
  const newData = JSON.stringify(uniqueCodes.sort());

  fs.writeFile("complete-iso-codes.json", newData, function (err) {
    if (err) throw err;
    console.log("complete");
  });
};
createCompleteIsoList();
