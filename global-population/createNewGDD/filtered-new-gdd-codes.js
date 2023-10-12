import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const isoCodes = [];
const uniqueCodes = [];

const filterNewGDDCodes = () => {
  const observableIso = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../isoCodes/observable-iso.json"),
      "utf-8"
    )
  );

  const input = JSON.parse(
    fs.readFileSync(path.join(__dirname, "newGDD.json"), "utf-8")
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

  fs.writeFile("filtered-new-gdd-codes.json", newData, function (err) {
    if (err) throw err;
    console.log("complete");
  });
};
filterNewGDDCodes();
