/*
@marieldelagarza (8/9/22) - This file is to filter a large .json file
and pull out only the objects with a specific year value. 

Info for path module: https://nodejs.dev/learn/the-nodejs-path-module 
Info for fs module: https://nodejs.dev/learn/the-nodejs-fs-module 
*/

/************Imports************/
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

//CHANGE THESE FOR THE YEAR YOU WANT TO FILTER FOR
//you'll need to create an empty json file to send your data to
const yearFilter = "2100";
const yearFileName = "2100_GDD_data.json";

// Function to filter GDD data and create json file for specific year
const createYearData = () => {
  const input = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../createNewGDD/newGDD.json"),
      "utf-8"
    )
  );

  let filtered = input.filter((a) => {
    return a["Year"] == yearFilter;
  });
  //console.log(filtered);

  const newData = JSON.stringify(filtered);
  fs.writeFile(yearFileName, newData, function (err) {
    if (err) throw err;
    console.log("complete " + yearFilter);
  });
};

createYearData();
