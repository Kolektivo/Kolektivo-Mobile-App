import { format } from 'date-fns'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from 'src/styles/colors'
import fontStyles from 'src/styles/fonts'

type Level = {
  level: number
  date: string
}

type Props = {
  levels: Level[]
}

const levelNames = ['Beginner', 'Novice', 'Professional']

const DateObtainedAccordian: React.FC<Props> = ({ levels }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleAccordion = () => setIsExpanded((prev) => !prev)

  return (
    <View style={styles.dateObtainedContainer}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.headerRow}>
        <View style={styles.headerContent}>
          <Text style={styles.sectionTitle}>Date Obtained</Text>
          <Text style={styles.arrow}>{isExpanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      {isExpanded &&
        levels.map((item) => (
          <View key={item.level} style={styles.dateObtainedRow}>
            <Text style={styles.levelText}>{levelNames[item.level]}</Text>
            <Text style={styles.dateText}>{format(new Date(item.date), 'MMMM d, yyyy')}</Text>
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  dateObtainedContainer: {
    flex: 1,
    paddingTop: 2,
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
  dateObtainedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    gap: 10,
  },
  levelText: {
    ...fontStyles.small,
    color: colors.black,
  },
  dateText: {
    ...fontStyles.small,
    color: colors.black,
  },
})

export default DateObtainedAccordian
