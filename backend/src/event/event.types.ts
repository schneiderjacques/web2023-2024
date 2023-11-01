export interface Event {
  id: string;
  userId: string;
  name: string;
  date_created: string;
  date_updated: string;
  date: string;
  location: Location;
  description: string;
  start_time: string;
  color: string;
  type: string;
}

export interface Location {
  city: string;
  postal_code: string;
  street: string;
  location_details: string;
  longitude: number;
  latitude: number;
}
