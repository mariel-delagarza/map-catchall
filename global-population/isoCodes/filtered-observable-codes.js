import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const filterObservableCodes = () => {
  const observableIso = JSON.parse(
    fs.readFileSync(path.join(__dirname, "observable-iso.json"), "utf-8")
  );

  const globalDemographicDataIso = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "global-demographic-data-iso.json"),
      "utf-8"
    )
  );

  const filteredObservableCodes = observableIso.filter(
    (element) => !globalDemographicDataIso.includes(element)
  );

  /****Write data to new JSON file for copying****/
  const newData = JSON.stringify(filteredObservableCodes.sort());

  fs.writeFile("filtered-observable-codes.json", newData, function (err) {
    if (err) throw err;
    console.log("complete");
  });
};
filterObservableCodes();
