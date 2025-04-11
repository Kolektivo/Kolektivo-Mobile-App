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
  opening_hours: Array<string>
  wifi?: boolean
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
}

export type VendorWithLocation = Vendor & {
  location: LatLng
}

export type Vendors = {
  [name: string]: Vendor | VendorWithLocation
}
