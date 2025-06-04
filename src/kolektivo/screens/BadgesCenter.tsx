import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { t } from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, FlatList, SectionList, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import BadgeProgressTile from 'src/kolektivo/activities/badges/BadgeProgressTile'
import { BadgeDataResponse } from 'src/kolektivo/activities/badges/saga'
import variables from 'src/kolektivo/styles/variables'
import { headerWithBackButton } from 'src/navigator/Headers'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import { useSelector } from 'src/redux/hooks'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

type Props = NativeStackScreenProps<StackParamList, Screens.BadgesCenter>

function BadgesCenter({ navigation }: Props) {
  const { t } = useTranslation()
  const isLoading = useSelector((state) => state.home.loading)
  const insets = useSafeAreaInsets()
  const screenWidth = Dimensions.get('window').width
  const targetWidth = (screenWidth - 3 * variables.contentPadding) / 2 // 2 columns + spacing
  const baseWidth = 215 // Assuming this is the original fixed width of BadgeProgressTile

  const scaleFactor = targetWidth / baseWidth

  const badges: BadgeDataResponse[] = [
    {
      title: 'Permaculture',
      stamps: { contractAddress: '0x123', amount: 10, title: 'Permaculture' },
      contractAddress: '0x0000000000000000000000000000000000000000',
      level: 0,
    },
    {
      title: 'Clean-ups',
      stamps: { contractAddress: '0x456', amount: 20, title: 'Clean-ups' },
      contractAddress: '0x0000000000000000000000000000000000000000',
      level: 0,
    },
    {
      title: 'Permaculture',
      stamps: { contractAddress: '0x123', amount: 10, title: 'Permaculture' },
      contractAddress: '0x0000000000000000000000000000000000000000',
      level: 0,
    },
    {
      title: 'Clean-ups',
      stamps: { contractAddress: '0x456', amount: 20, title: 'Clean-ups' },
      contractAddress: '0x0000000000000000000000000000000000000000',
      level: 0,
    },
  ]

  // Scroll Aware Header
  const scrollPosition = useSharedValue(0)

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollPosition.value = event.contentOffset.y
  })

  const keyExtractor = (_item: any, index: number) => {
    return index.toString()
  }

  const userBadgesCarousel = {
    data: [{}],
    renderItem: () => (
      <View>
        <FlatList
          data={badges}
          keyExtractor={(badge) => badge.title}
          numColumns={2} // Display badges in columns of two
          renderItem={({ item }) => (
            <View style={{ width: targetWidth, alignItems: 'center' }}>
              <View style={{ transform: [{ scale: scaleFactor }] }}>
                <BadgeProgressTile {...item} />
              </View>
            </View>
          )}
          columnWrapperStyle={styles.columnWrapper} // Add spacing between columns
          contentContainerStyle={styles.badgesContainer} // Add padding around the grid
        />
      </View>
    ),
  }

  const sections = [userBadgesCarousel]

  return (
    <SafeAreaView testID="BadgesCenter" style={styles.container} edges={[]}>
      <AnimatedSectionList
        // Workaround iOS setting an incorrect automatic inset at the top
        scrollIndicatorInsets={{ top: 0.01 }}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        refreshing={isLoading}
        style={styles.container}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        sections={sections}
        keyExtractor={keyExtractor}
        testID="BadgesCenter/SectionList"
      />
    </SafeAreaView>
  )
}

BadgesCenter.navigationOptions = () => ({
  ...headerWithBackButton,
  headerTitle: t('badge.myBadges'),
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: variables.contentPadding,
  },
  badgesContainer: {
    paddingHorizontal: variables.contentPadding, // Add padding around the grid
    gap: 15, // Add spacing between badges
  },
  columnWrapper: {
    justifyContent: 'space-between', // Space badges evenly in each row
    marginBottom: variables.contentPadding, // Add spacing between rows
  },
})

export default BadgesCenter
