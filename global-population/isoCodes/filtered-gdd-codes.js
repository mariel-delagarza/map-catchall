import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const filterGDDCodes = () => {
  const observableIso = JSON.parse(
    fs.readFileSync(path.join(__dirname, "observable-iso.json"), "utf-8")
  );

  const globalDemographicDataIso = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "global-demographic-data-iso.json"),
      "utf-8"
    )
  );

  const filteredGDDCodes = globalDemographicDataIso.filter(
    (element) => !observableIso.includes(element)
  );

  /****Write data to new JSON file for copying****/
  const newData = JSON.stringify(filteredGDDCodes.sort());

  fs.writeFile("filtered-gdd-codes.json", newData, function (err) {
    if (err) throw err;
    console.log("complete");
  });
};
filterGDDCodes();
