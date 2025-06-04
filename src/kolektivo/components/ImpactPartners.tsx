import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import variables from 'src/kolektivo/styles/variables'
import colors from 'src/styles/colors'
import { typeScale } from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'

const ImpactPartners = () => {
  const partners = [
    { id: 1, title: 'Celo Foundation', image: require('src/kolektivo/images/celo-partner.png') },
    { id: 2, title: 'UNICEF', image: require('src/kolektivo/images/unicef-partner.png') },
    {
      id: 3,
      title: 'Kolektivo Labs',
      image: require('src/kolektivo/images/kolectivolabs-partner.png'),
    },
  ]
  const { t } = useTranslation()

  return (
    <View>
      <Text style={styles.sectionTitle}>{t('myCommunity.impactPartners')}</Text>
      <ScrollView
        style={styles.horizontalList}
        horizontal
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={true}
        scrollEventThrottle={16}
      >
        {partners.map((partner) => (
          <View key={partner.id} style={styles.partnerContainer}>
            <View style={styles.partnerCard}>
              <Image source={partner.image} style={styles.partnerImage} />
            </View>
            <Text style={styles.partnerTitle}>{partner.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  horizontalList: {
    flexDirection: 'row',
    paddingHorizontal: variables.contentPadding,
  },
  sectionTitle: {
    ...typeScale.labelLarge,
    color: colors.black,
    marginHorizontal: Spacing.Smallest8,
    marginTop: Spacing.Smallest8,
    marginBottom: Spacing.Smallest8,
    marginLeft: variables.contentPadding,
  },
  partnerContainer: {
    alignItems: 'center',
    marginRight: Spacing.Smallest8,
  },
  partnerCard: {
    width: 160,
    height: 90,
    borderRadius: 10,
    backgroundColor: colors.gray5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  partnerTitle: {
    ...typeScale.bodySmall,
    color: colors.black,
    textAlign: 'center',
    marginTop: Spacing.Smallest8,
  },
})

export default ImpactPartners
