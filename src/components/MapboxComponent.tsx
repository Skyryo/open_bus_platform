import { Map, useControl } from "react-map-gl"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { DeckProps } from "@deck.gl/core"
import { GeoJsonLayer } from "@deck.gl/layers"
import type { Feature, Geometry } from "geojson"
import "mapbox-gl/dist/mapbox-gl.css"
import BusRouteData from "../../assets/bus-routes.json"
import {
  BusRoutesFeatureCollection,
  BusRoutesProperties,
} from "../../domain/index"

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}

export default function MapboxComponent() {
  const accessToken = import.meta.env.VITE_MAP_BOX_API_KEY

  return (
    <Map
      mapboxAccessToken={accessToken}
      initialViewState={{
        longitude: 139.7,
        latitude: 35.7,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      style={{ width: "100%", height: "100%" }}
    >
      <DeckGLOverlay
        layers={[
          new GeoJsonLayer({
            id: "scatterplot-layer",
            data: BusRouteData as BusRoutesFeatureCollection,
            stroked: false,
            filled: true,
            pointType: "circle+text",
            pickable: true,

            getFillColor: [160, 160, 180, 200],
            getText: (f: Feature<Geometry, BusRoutesProperties>) =>
              f.properties.title,
            getLineColor: (f: Feature<Geometry, BusRoutesProperties>) => {
              const hex = f.properties.color
              // convert to RGB
              return hex ? hex : [0, 0, 0]
            },
            getLineWidth: 28,
            getPointRadius: 4,
            getTextSize: 12,
          }),
        ]}
      />
    </Map>
  )
}
