import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { includes, map, remove, valuesIn } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import MapView, { Geojson } from 'react-native-maps'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MapFilterButton } from 'src/kolektivo/components/MapButtons'
import ForestMarker from 'src/kolektivo/icons/ForestMarker'
import VendorMarker from 'src/kolektivo/icons/VendorMarker'
import MapBottomSheet from 'src/kolektivo/map/MapBottomSheet'
import {
  removeMapCategory,
  setFoodForest,
  setMapCategory,
  setSearchQuery,
} from 'src/kolektivo/map/actions'
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

type Props = NativeStackScreenProps<StackParamList, Screens.MapScreen> & {
  route: {
    params?: {
      mapCategory?: MapCategory
    }
  }
}
export default function MapScreen({ route }: Props) {
  const scrollPosition = useRef(new Animated.Value(0)).current

  const dispatch = useDispatch()
  const mapCategory = useSelector(currentMapCategorySelector)
  const forests = useSelector(foodForestsSelector)
  const vendors = useSelector(vendorsWithLocationSelector)
  const { mapRef, ...vendorData } = useMap()
  const { currentVendor: _currentVendor } = vendorData
  const [localSearchText, setLocalSearchText] = useState('') // Local state for immediate updates

  useEffect(() => {
    if (route.params?.mapCategory) {
      if (route.params.mapCategory === MapCategory.All) {
        // If the category is 'All', set all categories
        Object.values(MapCategory).forEach((category) => {
          dispatch(setMapCategory(category))
        })
      } else {
        // Remove all categories except the one found in route.params.mapCategory
        Object.values(MapCategory).forEach((category) => {
          if (category !== route.params?.mapCategory) {
            dispatch(removeMapCategory(category))
          }
        })

        // Set the found mapCategory
        dispatch(setMapCategory(route.params.mapCategory))
      }
    }
  }, [route.params?.mapCategory, dispatch])

  const vendorLocationMarkers = () => {
    if (!mapCategory.includes(MapCategory.Vendor)) return null // Ensure Vendor category is selected

    return (
      <>
        {vendors.map((vendor: VendorWithLocation) => {
          // Check if the vendor's category is set and included in the mapCategory
          if (vendor.category && !mapCategory.includes(vendor.category as MapCategory)) {
            return null
          }

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

  const handleFilterToggle = (category: MapCategory) => {
    if (includes(mapCategory, category)) {
      dispatch(removeMapCategory(category))
    } else {
      dispatch(setMapCategory(category))
    }
  }

  const handleSearch = (search: string) => {
    setLocalSearchText(search)
    dispatch(setSearchQuery(search)) // Clear the filtered vendors if search is empty
  }

  return (
    <SafeAreaView style={styles.container}>
      <RenderFilters
        localSearchText={localSearchText}
        handleSearch={handleSearch}
        mapCategory={mapCategory}
        handleFilterToggle={handleFilterToggle}
      />
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

const SearchBar = React.memo(
  ({
    localSearchText,
    handleSearch,
  }: {
    localSearchText: string
    handleSearch: (text: string) => void
  }) => {
    return (
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search here"
          placeholderTextColor={Colors.gray5}
          value={localSearchText}
          onChangeText={handleSearch}
        />
      </View>
    )
  }
)

const RenderFilters = React.memo(
  ({
    localSearchText,
    handleSearch,
    mapCategory,
    handleFilterToggle,
  }: {
    localSearchText: string
    handleSearch: (text: string) => void
    mapCategory: MapCategory[]
    handleFilterToggle: (category: MapCategory) => void
  }) => {
    return (
      <View style={{ zIndex: 1000, position: 'absolute', top: 60, left: 0, right: 0 }}>
        {/* Search Bar */}
        <SearchBar localSearchText={localSearchText} handleSearch={handleSearch} />

        {/* Filter Buttons */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {remove(valuesIn(MapCategory), (x) => x !== 'All').map((cat: string) => (
            <View key={cat} style={{ marginRight: 10 }}>
              <MapFilterButton
                text={cat}
                active={mapCategory.includes(cat as MapCategory)}
                type={cat as any}
                onPress={() => {
                  handleFilterToggle(cat as MapCategory)
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingHorizontal: 10,
    marginBottom: 10, // Add spacing between the search bar and the filter buttons
  },
  searchBar: {
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.gray1,
    color: Colors.black,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})
