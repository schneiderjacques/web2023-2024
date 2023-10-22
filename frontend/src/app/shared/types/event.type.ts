export interface Event {
  id: string
  userId: string
  name: string
  dateCreated: string
  dateUpdated: string
  date: string
  location: Location
  description: string
  startTime: string
  color: string
  type: string
}

export interface Location {
  city: string
  postalCode: string
  street: string
  locationDetails: string
  longitude: number
  latitude: number
}
