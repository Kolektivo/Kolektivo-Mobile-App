import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { t } from 'i18next'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import NotificationBell from 'src/home/NotificationBell'
import Exclamation from 'src/icons/Exclamation'
import KolCurrency from 'src/icons/KolCurrency'
import Website from 'src/icons/Website'
import AchievementListItem from 'src/kolektivo/components/AchievementListItem'
import ImpactPartners from 'src/kolektivo/components/ImpactPartners'
import Members from 'src/kolektivo/icons/Members'
import { headerWithBackButton } from 'src/navigator/Headers'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import { default as colors, default as Colors } from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'
import variables from 'src/styles/variables'

type Props = NativeStackScreenProps<StackParamList, Screens.MyCommunityDetailsScreen>

export const MyCommunityDetailsScreen = ({ route }: Props) => {
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
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image
            source={require('src/kolektivo/images/Flag.png')} // Adjust the path to your image
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.heroName}>{activity.name}</Text>
            <Text style={styles.heroEstDate}>{activity.est_date}</Text>
          </View>
        </View>
        <View style={styles.rewardsContainer}>
          <AchievementListItem
            icon={<Members color={colors.primary} />}
            title={'Members'}
            subtitle={activity.members}
            onPress={() => {}}
            borderColor={Colors.gray2}
          />
          <AchievementListItem
            icon={<KolCurrency size={22} />}
            title={t('point')}
            subtitle={`${activity.points}`}
            onPress={() => {}}
            borderColor={Colors.gray2}
          />
        </View>
        <View style={[styles.main]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          ></View>
          <ActivityDetailListItem
            category="Website"
            content={activity.website}
            icon={<Website size={20} color="#737373" />}
          />
          <ActivityDetailListItem
            category={`About ${activity.name}`}
            content={activity.description}
            icon={<Exclamation color={'#737373'} />}
            showCategory={true}
          />
        </View>
        <ImpactPartners />
      </ScrollView>
    </SafeAreaView>
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

MyCommunityDetailsScreen.navigationOptions = () => ({
  ...headerWithBackButton,
  headerTitle: t('myCommunity.title'),
  headerRight: () => {
    return (
      <View style={[styles.topElementsContainer, { marginRight: Spacing.Tiny4 }]}>
        <NotificationBell testID="WalletHome/NotificationBell" />
      </View>
    )
  },
})

const styles = StyleSheet.create({
  backgroundImage: {
    width: '60%',
    height: '50%',
    borderRadius: 10,
  },
  hero: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  heroName: {
    ...typeScale.titleSmall,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 18,
  },
  heroEstDate: {
    ...typeScale.bodySmall,
    color: colors.gray5,
    textAlign: 'center',
    marginTop: 4,
  },
  topElementsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingBottom: 35,
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
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
  rewardsContainer: {
    // works like a 2x2 grid
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: Spacing.Regular16,
  },
})

export default MyCommunityDetailsScreen
