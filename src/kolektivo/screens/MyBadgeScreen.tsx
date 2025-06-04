import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { t } from 'i18next'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import NotificationBell from 'src/home/NotificationBell'
import Exclamation from 'src/icons/Exclamation'
import { badgeImage } from 'src/images/Images'
import { BadgeDataResponse } from 'src/kolektivo/activities/badges/saga'
import DateObtainedAccordian from 'src/kolektivo/components/DateObtained'
import UpcomingActivities from 'src/kolektivo/components/UpcomingActivities'
import CheckMark from 'src/kolektivo/icons/CheckMark'
import Colors from 'src/kolektivo/styles/colors'
import { headerWithBackButton } from 'src/navigator/Headers'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import { typeScale } from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'
import variables from 'src/styles/variables'

type Props = NativeStackScreenProps<StackParamList, Screens.MyBadgeScreen>

export const MyBadgeScreen = ({ route }: Props) => {
  const badge: BadgeDataResponse = {
    title: 'Permaculture',
    stamps: { contractAddress: '0x123', amount: 10, title: 'Permaculture' },
    contractAddress: '0x0000000000000000000000000000000000000000',
    level: 0,
  }

  const dummyLevels = [
    { level: 0, date: '2023-09-01' },
    { level: 1, date: '2023-09-02' },
    { level: 2, date: '2023-09-03' },
  ]

  const activity = {
    id: 'bdf67a2a-56ee-4988-b02f-0381cbd96e80',
    website: 'www.kolektivo.network/tt',
    name: 'Kolektivo Trinidad',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Readable content of a page when looking at its layout.',
    est_date: 'Est. 3 Sept 2023',
    points: '3475.00',
    members: '120',
  }

  return (
    <SafeAreaView edges={[]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View testID="BadgeProgressTile/BoundedBox" style={styles.wireframe}>
            <Image source={badgeImage} style={styles.image} />
            <View testID="BadgeProgressTile/Container" style={styles.innerContainer}>
              <Text style={styles.title}>{badge.title}</Text>
              <Text style={styles.subtitle}>{t('badge.rank.0')}</Text>
            </View>
          </View>
          <ProgressBar progress={badge.stamps.amount} total={20} />
        </View>
        <View style={styles.main}>
          <DateObtainedListItem levels={dummyLevels} />
          <ActivityDetailListItem
            category={`About this badge`}
            content={activity.description}
            icon={<Exclamation color={'#737373'} />}
            showCategory={true}
          />
        <UpcomingActivities title={'relatedActivities.title'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function ProgressBar({ progress, total }: { progress: number; total: number }) {
  return (
    <View style={[styles.progressBoundingBox, { backgroundColor: Colors.gray2 }]}>
      <Text style={styles.progressText}>{`${progress}/${total}`}</Text>
      <View style={[styles.progressBar, { width: `${(100 * progress) / total}%` }]}></View>
    </View>
  )
}

type LineItemProps = {
  category: string
  content: string
  icon?: React.ReactNode | React.ReactNode[]
  showCategory?: boolean
}

const ActivityDetailListItem = ({
  category,
  content,
  icon,
  showCategory = false,
}: LineItemProps) => {
  return (
    <View style={[styles.detailRow]}>
      {icon}
      <View>
        {showCategory && (
          <Text style={[styles.detailText, styles.detailContent, styles.detailCategory]}>
            {category}
          </Text>
        )}
        <Text style={[styles.detailText, styles.detailContent]}>{content}</Text>
      </View>
    </View>
  )
}

type Level = {
  level: number
  date: string
}

const DateObtainedListItem = ({ levels }: { levels: Level[] }) => {
  return (
    <View style={[styles.detailRow]}>
      <CheckMark width={24} height={22} />
      <View style={[styles.detailContent]}>
        <DateObtainedAccordian levels={levels} />
      </View>
    </View>
  )
}

MyBadgeScreen.navigationOptions = () => ({
  ...headerWithBackButton,
  headerTitle: t('badge.myBadge'),
  headerRight: () => {
    return (
      <View style={[styles.topElementsContainer, { marginRight: Spacing.Tiny4 }]}>
        <NotificationBell testID="WalletHome/NotificationBell" />
      </View>
    )
  },
})

const styles = StyleSheet.create({
  wireframe: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: variables.contentPadding,
    gap: 20,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    ...typeScale.titleSmall,
    color: Colors.black,
    textAlign: 'left',
  },
  subtitle: {
    ...typeScale.bodySmall,
    color: Colors.gray3,
    marginTop: 5,
    textAlign: 'left',
  },
  hero: {
    paddingTop: 20,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: Spacing.Regular16,
  },
  topElementsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    paddingHorizontal: Spacing.Regular16,
  },
  detailRow: {
    flexDirection: 'row',
    padding: variables.contentPadding,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  detailText: {
    ...typeScale.bodyMedium,
  },
  detailContent: {
    marginHorizontal: variables.contentPadding * 1.7,
    flex: 2,
  },
  detailCategory: {
    marginBottom: 8,
  },
  progressBoundingBox: {
    marginVertical: variables.contentPadding / 4,
    height: 25,
    width: '100%',
    borderRadius: variables.borderRadius / 2,
    borderWidth: variables.borderWidth,
    borderColor: Colors.primary,
  },
  progressBar: {
    height: 25,
    backgroundColor: Colors.primaryDisabled,
    borderRadius: variables.borderRadius / 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  progressText: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    ...typeScale.labelSmall,
    color: Colors.gray4,
  },
})

export default MyBadgeScreen
