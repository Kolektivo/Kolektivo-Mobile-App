import { LatLng } from 'react-native-maps'

export type Vendor = {
  attributes: {
    name: any
    subtitle: any
    logo: any
    website: any
    latitude: any
    longitude: any
    phone_number: any
    acceptsGuilder: any
    providesGuilder: any
    street: any
    building_number: any
    city: any
    account: any
  }
  name: string
  subtitle?: string
  location?: string
  website?: string
  community?: string
  logo_path?: string
  siteURI: string
  description: string
  opening_hours: OpeningHour[]
  wifi?: string
  tags: Array<string>
  currencies: Array<string>
  address?: string
  phone?: string
  category?: string
  acceptsGuilder?: boolean
  providesGuilder?: boolean
  street: string
  building_number: string
  city: string
  account?: string
  locationAddress?: string
}

export type OpeningHour = {
  day: number
  openingTime: string
  closingTime: string
  isClosed: boolean
}

export type VendorWithLocation = Vendor & {
  location: LatLng
}

export type Vendors = {
  [name: string]: Vendor | VendorWithLocation
}
