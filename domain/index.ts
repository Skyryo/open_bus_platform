import { FeatureCollection, Feature, Geometry } from "geojson"

interface BusPoleOrder {
  id: string
  name: string
  index: number
}

export interface BusRoutesProperties {
  title: string
  operator: string
  busstopPoleOrder: BusPoleOrder[]
  color: [number, number, number]
}

export interface BusRoutesFeature
  extends Feature<Geometry, BusRoutesProperties> {
  properties: BusRoutesProperties
}

export interface BusRoutesFeatureCollection
  extends FeatureCollection<Geometry, BusRoutesProperties> {
  features: BusRoutesFeature[]
}
