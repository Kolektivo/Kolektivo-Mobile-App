import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { debounce } from 'lodash'
import React, { ReactNode, useCallback } from 'react'
import { StyleSheet, Text } from 'react-native'
import Groceries from 'src/kolektivo/icons/Groceries'
import Restaurant from 'src/kolektivo/icons/Restaurant'
import { MapCategory } from 'src/kolektivo/map/constants'
import Colors from 'src/styles/colors'
import fontStyles from 'src/styles/fonts'
import variables from 'src/styles/variables'

export type FilterButtonProps = {
  onPress: () => void
  text: string | ReactNode
  accessibilityLabel?: string
  activeColor?: Colors
  active: boolean
  type?: MapCategory
}

export const FilterButton = ({
  text,
  accessibilityLabel,
  activeColor,
  active,
  type,
  onPress,
}: FilterButtonProps) => {
  // Debounce onPress event so that it is only called once
  // for multiple subsequent calls in a given period
  const debouncePress = useCallback(debounce(onPress, 100, { leading: true, trailing: false }), [
    onPress,
    active,
  ])

  const icon = getIcon(type, active)
  const { textColor, backgroundColor } = getColors(type, active)

  return (
    <TouchableOpacity
      onPress={debouncePress}
      style={[styles.wrapper, { backgroundColor }, styles.rounded]}
    >
      {icon}
      <Text
        maxFontSizeMultiplier={1}
        accessibilityLabel={accessibilityLabel}
        style={{ ...styles.textStyle, color: textColor }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: (variables.contentPadding * 2) / 3,
    marginHorizontal: variables.contentPadding / 3,
  },
  rounded: {
    borderRadius: 10,
  },
  textStyle: {
    padding: variables.contentPadding / 3,
    ...fontStyles.small,
  },
})

const getIcon = (type: MapCategory | undefined, active: boolean = false): ReactNode => {
  switch (type) {
    case MapCategory.Vendor: {
      return <></>
    }
    case MapCategory.FoodForest: {
      return <></>
    }
    case MapCategory.Restaurant: {
      return <Restaurant color={active ? '#0F0F0F' : Colors.white} />
    }
    case MapCategory.Groceries: {
      return <Groceries color={active ? '#0F0F0F' : Colors.white} />
    }
    default: {
      return <></>
    }
  }
}

const getColors = (type: MapCategory | undefined, active: boolean = false) => {
  const textColor = active ? '#0F0F0F' : Colors.white
  let backgroundColor
  switch (type) {
    // case MapCategory.Vendor: {
    //   backgroundColor = active ? Colors.vendorButton : Colors.gray3
    //   break
    // }
    // case MapCategory.FoodForest: {
    //   backgroundColor = active ? Colors.forestButton : Colors.gray3
    //   break
    // }
    default: {
      backgroundColor = active ? Colors.white : Colors.gray3
      break
    }
  }
  return { textColor, backgroundColor }
}

export const MapFilterButton = React.memo(FilterButton)
