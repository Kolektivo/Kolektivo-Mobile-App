import BottomSheet from '@gorhom/bottom-sheet'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { currentVendorSelector } from 'src/kolektivo/vendors/selector'
import { Vendors, VendorWithLocation } from 'src/kolektivo/vendors/types'

/**
 * Formats the REST API response to a format that is more usable in the app.
 * @param vendorObject Vendor object from API
 * @returns {Vendors}
 */
export const formatVendors = (vendorObject: Record<string, any>): Vendors => {
  const result = Object.assign(
    {},
    ...Object.entries(vendorObject).map(([name, v]) => {
      const {
        category,
        community,
        logo_path,
        website,
        latitude,
        longitude,
        phone,
        location,
        id,
        created_by,
        wifi,
      } = v

      return {
        [name]: {
          name: name,
          subtitle: community || category || '',
          logo_path: logo_path,
          siteURI: website,
          phoneNumber: phone,
          location: {
            latitude: latitude ?? 0,
            longitude: longitude ?? 0,
          },
          acceptsGuilder: false, // Assuming not present in the data
          providesGuilder: false, // Assuming not present in the data
          street: '',
          building_number: '',
          city: location,
          account: created_by || '',
        } as unknown as VendorWithLocation,
      }
    })
  )

  return result
}

/**
 * Determine whether the vendor has a valid LatLng coordinate defined.
 * @param vendor Vendor object
 * @returns boolean
 */
export const hasValidLocation = (vendor: VendorWithLocation): boolean => {
  const { location } = vendor
  const { latitude, longitude } = location as any
  return !!latitude && !!longitude
}

export const useInteractiveBottomSheet = (
  bottomSheetRef: React.RefObject<BottomSheet>
): [string[]] => {
  const snapPoints = React.useMemo(() => ['10%', '24%', '50%', '80%'], [])
  const currentVendor = useSelector(currentVendorSelector)

  useEffect(() => {
    handleVendorChange()
  }, [])

  useEffect(() => {
    handleVendorChange()
  }, [currentVendor])

  const handleVendorChange = () => {
    if (currentVendor) {
      bottomSheetRef.current?.snapToIndex(0)
    }
  }

  return [snapPoints]
}
