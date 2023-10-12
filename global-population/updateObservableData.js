import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const year = 2100;
const fileYear = 100;

const updateData = () => {
  const observableData = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "ne_110m_admin_0_countries_lakes_copy.json"),
      "utf-8"
    )
  );

  const isoCodes = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "/createNewGDD/filtered-new-gdd-codes.json"),
      "utf-8"
    )
  );

  const yearData = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, `/yearFiltering/${year}_GDD_data.json`),
      "utf-8"
    )
  );

  // pull this out for readability in makeOriginalIsoCodes function
  let originalDataArray =
    observableData.objects.ne_110m_admin_0_countries_lakes.geometries;
  //console.log(originalDataArray[0].properties.POP_EST);
  //console.log(yearData[0][]);

  //let object = originalDataArray.find(
  //(element) => element.properties.ISO_A3 == isoCodes[0]
  //);
  //console.log(object);

  for (let i = 0; i < isoCodes.length; i++) {
    let obj1 = originalDataArray.find(
      (element) => element.properties.ISO_A3 == isoCodes[i]
    );

    let obj2 = yearData.find(
      (element) => element["ISO3 Alpha-code"] == isoCodes[i]
    );

    Object.assign(obj1.properties, { POP_EST: obj2.POP_EST });
  }

  /*console.log(
    originalDataArray.find(
      (element) => element.properties.ISO_A3 == isoCodes[0]
    )
  );*/

  let newObject = {
    type: observableData.type,
    arcs: observableData.arcs,
    transform: observableData.transform,
    objects: {
      ne_110m_admin_0_countries_lakes: {
        type: "GeometryCollection",
        geometries: originalDataArray,
      },
    },
  };

  //console.log(observableData.type);

  const newData = JSON.stringify(newObject);
  fs.writeFile(`new_y_${fileYear}.json`, newData, function (err) {
    if (err) throw err;
    console.log("complete " + year);
  });
};

updateData();
