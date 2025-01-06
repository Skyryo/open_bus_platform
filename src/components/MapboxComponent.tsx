import { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"

import "mapbox-gl/dist/mapbox-gl.css"

export default function MapboxComponent() {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_API_KEY
    if (mapRef && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        zoom: 12,
        center: [139.767052, 35.681167],
      })

      mapRef.current.on("style.load", () => {
        // add a geojson source with a polygon to be used in the clip layer.
        mapRef.current.addSource("odpt.Busroute:Toei.Ou57", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  name: "Toei Bus Route Ou57",
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [139.72128, 35.77918],
                    [139.72254, 35.77929],
                    [139.72252, 35.78222],
                    [139.72249, 35.78337],
                    [139.72616, 35.7826],
                    [139.72757, 35.7823],
                    [139.72827, 35.78207],
                    [139.72874, 35.78178],
                    [139.72991, 35.78079],
                    [139.73162, 35.7793],
                    [139.73253, 35.77801],
                    [139.73325, 35.77694],
                    [139.73332, 35.77663],
                    [139.73329, 35.77595],
                    [139.73313, 35.7734],
                    [139.73313, 35.77307],
                    [139.73327, 35.77238],
                    [139.73387, 35.77074],
                    [139.73463, 35.76859],
                    [139.73573, 35.76522],
                    [139.73612, 35.76393],
                    [139.73725, 35.76189],
                    [139.73766, 35.76114],
                    [139.73772, 35.76023],
                    [139.73763, 35.75939],
                    [139.73747, 35.75829],
                    [139.73736, 35.75638],
                    [139.73725, 35.7556],
                    [139.73712, 35.75488],
                    [139.73713, 35.75469],
                    [139.73803, 35.75343],
                    [139.73825, 35.75354],
                    [139.73865, 35.75399],
                    [139.7391, 35.75446],
                    [139.73938, 35.75468],
                    [139.74115, 35.75545],
                    [139.74158, 35.75584],
                    [139.74195, 35.75632],
                    [139.74262, 35.75703],
                    [139.74278, 35.75719],
                    [139.7449, 35.75936],
                    [139.74765, 35.76219],
                    [139.74916, 35.76373],
                    [139.74964, 35.76422],
                    [139.75133, 35.76399],
                    [139.75138, 35.76415],
                    [139.75145, 35.76414],
                    [139.75159, 35.76419],
                  ],
                },
              },
            ],
          },
        })

        mapRef.current.addLayer({
          id: "toei-bus-route-ou57",
          type: "line",
          source: "odpt.Busroute:Toei.Ou57",
          paint: {
            "line-color": "rgba(255, 0, 0, 0.9)",
            "line-width": 8,
          },
        })
      })

      return () => {
        if (mapRef.current) {
          mapRef.current.remove()
        }
      }
    }
  }, [])

  return (
    <>
      <div id="map-container" ref={mapContainerRef} />
    </>
  )
}
