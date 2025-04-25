import { BottomSheetHandleProps } from '@gorhom/bottom-sheet'
import React, { memo, useMemo } from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import MapView from 'react-native-maps'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { rgbaColor } from 'react-native-reanimated/src/reanimated2/Colors'
import { useSelector } from 'react-redux'
import FindMy from 'src/icons/FindMy'
import { userLocationSelector } from 'src/kolektivo/map/selector'
import variables from 'src/styles/variables'

interface CustomHandleProps extends BottomSheetHandleProps {
  title: string
  style?: StyleProp<ViewStyle>
  mapRef: React.RefObject<MapView>
}

const MapSheetHandle: React.FC<CustomHandleProps> = ({ title, style, animatedIndex, mapRef }) => {
  const userLocation = useSelector(userLocationSelector)
  const containerStyle = useMemo(() => [styles.container, style], [style])
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const borderTopRadius = interpolate(animatedIndex.value, [1, 2], [20, 0], Extrapolate.CLAMP)
    return {
      borderTopLeftRadius: borderTopRadius,
      borderTopRightRadius: borderTopRadius,
    }
  })

  const handleFindMy = () => {
    mapRef.current?.animateToRegion({
      ...userLocation,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    })
  }

  // render
  return (
    <Animated.View
      style={[containerStyle, containerAnimatedStyle]}
      renderToHardwareTextureAndroid={true}
    >
      <View>
        <View style={[styles.headerFilter, styles.flex]}>
          <TouchableOpacity style={styles.findMy} onPress={handleFindMy}>
            <FindMy size={14} />
          </TouchableOpacity>
        </View>
        <View style={[styles.searchFilter]}>
          <Text>{title}</Text>
        </View>
      </View>
    </Animated.View>
  )
}

export default memo(MapSheetHandle)

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    zIndex: 99999,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerFilter: {
    marginTop: -40,
    paddingHorizontal: variables.contentPadding,
    width: '100%',
    maxHeight: 32,
    overflow: 'visible',
  },
  searchFilter: {
    marginTop: variables.contentPadding * 1.5,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  filterRow: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  findMy: {
    backgroundColor: String(rgbaColor(255, 255, 255, 0.5)),
    borderRadius: 100,
    marginLeft: variables.contentPadding / 3,
    padding: variables.contentPadding / 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
