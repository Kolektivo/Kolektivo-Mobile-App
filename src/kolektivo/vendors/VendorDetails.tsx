import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Touchable from 'src/components/Touchable'
import Clock from 'src/icons/Clock'
import Directions from 'src/icons/Directions'
import KolCurrency from 'src/icons/KolCurrency'
import Phone from 'src/icons/Phone'
import Pin from 'src/icons/Pin'
import Share from 'src/icons/Share'
import Times from 'src/icons/Times'
import Website from 'src/icons/Website'
import AchievementListItem from 'src/kolektivo/components/AchievementListItem'
import OpeningHours from 'src/kolektivo/components/OpeningHours'
import WifiIco from 'src/kolektivo/icons/WifiIco'
import { VendorWithLocation } from 'src/kolektivo/vendors/types'
import colors from 'src/styles/colors'
import fontStyles from 'src/styles/fonts'
import variables from 'src/styles/variables'
import { navigateToURI } from 'src/utils/linking'

type Props = {
  vendor: VendorWithLocation
  close: () => void
  action: () => void
}

const VendorDetails = ({ vendor, close, action }: Props) => {
  const {
    name,
    subtitle,
    street,
    building_number,
    city,
    siteURI,
    description,
    tags,
    logo_path,
    phone,
    locationAddress,
    acceptsGuilder,
    providesGuilder,
    account,
    wifi,
    opening_hours,
  } = vendor
  const { location } = vendor as VendorWithLocation
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={[styles.sheetHeader]}>
        <View style={styles.sheetIcon}>
          <Image source={{ uri: logo_path }} style={styles.vendorIcon} />
        </View>
        <View style={styles.sheetDetails}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Touchable style={styles.sheetClose} onPress={close}>
          <Times />
        </Touchable>
      </View>
      <View testID="Profile/AchievementSummary" style={styles.container}>
        {/* <View style={[styles.cico, acceptsGuilder && providesGuilder ? styles.cicoPartner : null]}>
          {!!acceptsGuilder && (
            <View style={styles.verifiedRow}>
              <VerifiedIcon />
              <Text style={styles.verified}>{t('acceptsGuilder')}</Text>
            </View>
          )}
          {!!providesGuilder && (
            <View style={styles.verifiedRow}>
              <VerifiedIcon />
              <Text style={styles.verified}>{t('providesGuilder')}</Text>
            </View>
          )}
        </View> */}
        <View style={styles.contactRowContainer}>
          <ScrollView
            horizontal={true} // Enable horizontal scrolling
            showsHorizontalScrollIndicator={false} // Hide the scroll indicator (optional)
            contentContainerStyle={styles.contactRow} // Apply styles for spacing
          >
            {!!(
              ((location as any).latitude !== 0 && (location as any).longitude !== 0) ||
              street
            ) && (
              <TouchableOpacity
                // @ts-ignore @todo
                onPress={void 0}
                style={styles.contactItem}
              >
                <Directions color="white" size={24} />
                <Text style={styles.contactTitle}>Get Directions</Text>
              </TouchableOpacity>
            )}
            {!!phone && (
              <TouchableOpacity
                // @ts-ignore @todo
                onPress={void 0}
                style={styles.contactItem}
              >
                <Phone color="white" size={24} />
                <Text style={styles.contactTitle}>Call</Text>
              </TouchableOpacity>
            )}
            {!!siteURI && (
              <TouchableOpacity onPress={() => navigateToURI(siteURI)} style={styles.contactItem}>
                <Website color="white" size={24} />
                <Text style={styles.contactTitle}>Website</Text>
              </TouchableOpacity>
            )}
            {true && (
              <TouchableOpacity
                // @ts-ignore @todo
                onPress={void 0}
                style={styles.contactItem}
              >
                <Share color="white" size={24} />
                <Text style={styles.contactTitle}>Share</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
        <View style={styles.badgeContainer}>
          <AchievementListItem
            icon={<KolCurrency size={22} />}
            title={'Points Available'}
            subtitle={'1000'}
            onPress={() => 0}
          />
          <AchievementListItem
            icon={<KolCurrency size={22} />}
            title={'Donated'}
            subtitle={'260'}
            onPress={() => 0}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={true} // Enable vertical scrolling with an indicator
          keyboardShouldPersistTaps="handled" // Ensure taps do not reset scroll
          scrollEnabled={true} // Explicitly enable scrolling
        >
          {!!locationAddress && (
            <View style={styles.detailsContainer}>
              <Pin />
              <Text style={styles.detailsContent}>{locationAddress}</Text>
            </View>
          )}
          {!!opening_hours && (
            <View style={[styles.detailsContainer, { alignItems: 'flex-start' }]}>
              <View style={{ marginTop: 5 }}>
                <Clock color={colors.gray5} height={24} />
              </View>
              <OpeningHours hours={opening_hours} />
            </View>
          )}
          {!!siteURI && (
            <View style={styles.detailsContainer}>
              <Website color={colors.gray5} size={24} />
              <Text style={styles.detailsContent}>{siteURI}</Text>
            </View>
          )}
          <View style={styles.detailsContainer}>
            <WifiIco color={colors.gray5} size={24} />
            <Text style={styles.detailsContent}>
              {wifi === 'Yes' ? 'Wi-Fi Available' : 'Wi-Fi Not Available'}
            </Text>
          </View>
          <View style={{ paddingBottom: 400 }} />
        </ScrollView>
        {/* @todo Add QR scanning button, this should utilize deep linking */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '30%',
    paddingBottom: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  contactRowContainer: {
    flexDirection: 'row',
    paddingVertical: variables.contentPadding,
  },
  contactRow: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Align items vertically in the center
    paddingHorizontal: 10, // Add horizontal padding for spacing
  },
  contactItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginRight: 10, // Add spacing between items
  },
  contactTitle: {
    ...fontStyles.regular,
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 14,
  },

  sheetHeader: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Align items vertically in the center
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  sheetIcon: {
    flex: 0.3, // Take 30% of the row width
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetDetails: {
    flex: 0.7, // Take 70% of the row width
    justifyContent: 'center',
    paddingLeft: 10, // Add spacing between the icon and text
  },
  sheetClose: {
    position: 'absolute', // Position the button absolutely
    top: -8, // Align it to the top
    right: 0, // Align it to the left
    padding: 13, // Add padding for better touch area
  },
  vendorIcon: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
    borderRadius: 10,
    borderColor: colors.gray3,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  title: {
    ...fontStyles.h2,
    textAlign: 'left', // Align text to the left
    marginBottom: 4,
  },
  subtitle: {
    ...fontStyles.regular,
    textAlign: 'left', // Align text to the left
    color: colors.gray5,
    marginBottom: 4,
  },
  description: {
    ...fontStyles.regular,
    textAlign: 'left',
    fontSize: 14,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  detailsContainer: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Align items vertically inthe center
    paddingVertical: 10, // Add vertical padding
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: colors.gray2, // Set the border color to grey
    marginHorizontal: 20, // Add horizontal margin for spacing
    marginRight: 45,
    gap: 16,
  },
  detailsContent: {
    ...fontStyles.small, // Use regular font style
    flex: 1, // Allow the content to take up remaining space
  },

  street: {
    ...fontStyles.regular,
    color: colors.gray5,
    textAlign: 'justify',
    fontSize: 14,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  actionButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  innerContainer: {
    marginHorizontal: 20,
  },
  cico: {},
  cicoPartner: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  verified: {
    ...fontStyles.regular,
    textAlign: 'center',
    color: colors.gray5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
})

export default VendorDetails
