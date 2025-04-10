import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { map } from 'lodash'
import React, { useRef } from 'react'
import { Platform, StyleSheet } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import ForestMarker from 'src/kolektivo/icons/ForestMarker'
import VendorMarker from 'src/kolektivo/icons/VendorMarker'
import MapBottomSheet from 'src/kolektivo/map/MapBottomSheet'
import { setFoodForest } from 'src/kolektivo/map/actions'
import { GMAP_STYLE, LOCALE_REGION, MapCategory } from 'src/kolektivo/map/constants'
import { useMap } from 'src/kolektivo/map/hooks'
import { currentMapCategorySelector, foodForestsSelector } from 'src/kolektivo/map/selector'
import { FoodForest } from 'src/kolektivo/map/types'
import { setCurrentVendor } from 'src/kolektivo/vendors/actions'
import { vendorsWithLocationSelector } from 'src/kolektivo/vendors/selector'
import { VendorWithLocation } from 'src/kolektivo/vendors/types'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import { useDispatch, useSelector } from 'src/redux/hooks'
import Colors from 'src/styles/colors'

type Props = NativeStackScreenProps<StackParamList, Screens.MapScreen>
export default function MapScreen({ route }: Props) {
  const scrollPosition = useRef(new Animated.Value(0)).current

  const dispatch = useDispatch()
  const mapCategory = useSelector(currentMapCategorySelector)
  const forests = useSelector(foodForestsSelector)
  const vendors = useSelector(vendorsWithLocationSelector)
  const { mapRef, ...vendorData } = useMap()
  const { currentVendor: _currentVendor } = vendorData

  const vendorLocationMarkers = () => {
    if (!mapCategory.includes(MapCategory.Vendor)) return
    return (
      <>
        {vendors.map((vendor: VendorWithLocation) => {
          return (
            <VendorMarker
              title={vendor.name}
              coordinate={vendor.location}
              key={vendor.name}
              description={vendor.name}
              onPress={() => dispatch(setCurrentVendor(vendor))}
              color={_currentVendor === vendor ? Colors.primary : Colors.primaryDisabled}
            />
          )
        })}
      </>
    )
  }

  const forestLocationMarkers = () => {
    if (!mapCategory.includes(MapCategory.FoodForest)) return // forest is selected
    return (
      <>
        {map(forests, (forest: FoodForest) => {
          return (
            <ForestMarker
              title={forest.name}
              coordinate={forest.ingress || { latitude: 0, longitude: 0 }}
              key={forest.name}
              onPress={() => dispatch(setFoodForest(forest))}
            />
          )
        })}
      </>
    )
  }

  const renderGeojsonLayer = () => {
    if (!mapCategory.includes(MapCategory.FoodForest)) return
    return (
      <>
        {map(forests, (forest: FoodForest) => {
          return (
            <Geojson
              geojson={forest.data}
              strokeColor={Colors.successLight}
              strokeWidth={StyleSheet.hairlineWidth}
              fillColor={Colors.white}
            />
          )
        })}
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        initialRegion={LOCALE_REGION}
        customMapStyle={Platform.OS === 'android' ? GMAP_STYLE : undefined}
      >
        {forests && renderGeojsonLayer()}
        {forests && forestLocationMarkers()}
        {vendors && vendorLocationMarkers()}
      </MapView>
      <MapBottomSheet mapRef={mapRef} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})
