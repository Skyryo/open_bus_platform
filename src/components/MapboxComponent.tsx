import { Map, useControl } from "react-map-gl"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { DeckProps } from "@deck.gl/core"
import { GeoJsonLayer } from "@deck.gl/layers"
import "mapbox-gl/dist/mapbox-gl.css"
import data from "../../assets/bus-routes.json"

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}

export default function MapboxComponent() {
  const accessToken = import.meta.env.VITE_MAP_BOX_API_KEY
  const geoJsonData = data.map((item) => {
    return {
      type: "Feature",
      geometry: item["ug:region"],
      properties: {
        name: item["dc:title"],
        color: "red",
      },
    }
  })
  console.log(geoJsonData)
  return (
    <Map
      mapboxAccessToken={accessToken}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      style={{ width: "100%", height: "100%" }}
    >
      <DeckGLOverlay
        layers={[
          new GeoJsonLayer({
            id: "scatterplot-layer",
            data: geoJsonData,
            stroked: false,
            filled: true,
            pointType: "circle+text",
            pickable: true,

            getFillColor: [160, 160, 180, 200],
            getLineColor: (f: Feature<Geometry, PropertiesType>) => {
              const hex = f.properties.color
              // convert to RGB
              return hex
                ? hex.match(/[0-9a-f]{2}/g).map((x) => parseInt(x, 16))
                : [0, 0, 0]
            },
            getText: (f: Feature<Geometry, PropertiesType>) =>
              f.properties.name,
            getLineWidth: 50,
            getPointRadius: 4,
            getTextSize: 12,
          }),
        ]}
      />
    </Map>
  )
}
