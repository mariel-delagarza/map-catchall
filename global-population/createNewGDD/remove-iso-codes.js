/*
@marieldelagarza (8/10/22) - This file is to filter out the extra
ISO codes from the GDD so they match up with the original data

Info for path module: https://nodejs.dev/learn/the-nodejs-path-module 
Info for fs module: https://nodejs.dev/learn/the-nodejs-fs-module 
*/

/************Imports************/
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

let newGDD = [];

const createNewGDD = () => {
  const input = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../originalData/global-demographic-data.json"),
      "utf-8"
    )
  );

  const codesToRemove = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../isoCodes/filtered-gdd-codes.json"),
      "utf-8"
    )
  );

  newGDD = input.filter(
    (element) => !codesToRemove.includes(element["ISO3 Alpha-code"])
  );

  const newData = JSON.stringify(newGDD);

  fs.writeFile("newGDD.json", newData, function (err) {
    if (err) throw err;
    console.log("complete");
  });
};

createNewGDD();
