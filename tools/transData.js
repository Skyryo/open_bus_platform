import data from "../assets/rowData/bus-routes.json" assert { type: "json" }
import fs from "fs"
import chroma from "chroma-js"
//dataを希望するっdata型のJSONに変換してファイル出力する。ファイル名は実行引数から受け取る。

const newData = data.map((route) => {
  const newRoute = {
    type: "Feature",
    geometry: route["ug:region"],
    properties: {
      operator: route["odpt:operator"],
      busstopPoleOrder: route["odpt:busstopPoleOrder"],
      title: route["dc:title"],
      color: chroma.random().rgb(),
    },
  }
  return newRoute
})

const newData2 = {
  type: "FeatureCollection",
  features: newData,
}

fs.writeFileSync(process.argv[2], JSON.stringify(newData2, null, 2))
