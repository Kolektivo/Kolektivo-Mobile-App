import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from 'src/styles/colors'
import fontStyles from 'src/styles/fonts'

const dayMap = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const formatTime = (time: string) => {
  const [hour, minute] = time.split(':')
  const h = parseInt(hour)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const adjustedHour = h % 12 || 12
  return `${adjustedHour}:${minute}${suffix}`
}

type OpeningHour = {
  day: number
  openingTime: string
  closingTime: string
  isClosed: boolean
}

type Props = {
  hours: OpeningHour[]
}

const OpeningHours: React.FC<Props> = ({ hours }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleAccordion = () => setIsExpanded((prev) => !prev)

  return (
    <View style={styles.openingHoursContainer}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.headerRow}>
        <View style={styles.headerContent}>
          <Text style={styles.sectionTitle}>Opening Hours</Text>
          <Text style={styles.arrow}>{isExpanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      {isExpanded &&
        hours.map((item) => (
          <View key={item.day} style={styles.openingHoursRow}>
            <Text style={styles.dayText}>{dayMap[item.day]}</Text>
            <Text style={styles.timeText}>
              {item.isClosed
                ? 'Closed'
                : `${formatTime(item.openingTime)} - ${formatTime(item.closingTime)}`}
            </Text>
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  openingHoursContainer: {
    flex: 1,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensure the header content is spaced apart
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: 'row', // Arrange the title and arrow horizontally
    alignItems: 'center', // Align the title and arrow vertically
    gap: 8, // Add spacing between the title and arrow
  },
  sectionTitle: {
    ...fontStyles.h3,
  },
  arrow: {
    fontSize: 16,
    color: colors.gray5,
  },
  openingHoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    gap: 10,
  },
  dayText: {
    ...fontStyles.small,
    color: colors.gray5,
  },
  timeText: {
    ...fontStyles.small,
    color: colors.gray5,
  },
})

export default OpeningHours
