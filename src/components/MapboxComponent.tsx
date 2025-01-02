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
