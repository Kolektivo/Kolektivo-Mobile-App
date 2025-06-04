// Designer Created Figma Colors
export enum Colors {
  error = '#EA6042',
  primary = '#269793',
  primaryDark = '#1E7672',
  primaryDisabled = `${primary}80`, // 50% opacity
  primaryLight = '#EAF6F6',
  white = '#FFFFFF',
  black = '#2E3338',
  gray5 = '#505050',
  gray4 = '#666666',
  gray3 = '#757575',
  gray2 = '#E6E6E6',
  gray1 = '#F8F9F9',
  successDark = '#137211',
  successLight = '#F1FDF1',
  infoDark = '#0768AE',
  infoLight = '#E8F8FF',
  warningDark = '#9C6E00',
  warningLight = '#FFF9EA',
  errorDark = '#C93717',
  errorLight = '#FBF2F0',

  backgroundPrimary= '#FFFFFF', // Main background color for the app, used for primary surfaces (screens, navigation).
  backgroundSecondary= '#F8F9F9', // Subtle contrast background for secondary surfaces like cards, panels, or inputs.
  backgroundTertiary= '#E6E6E6', // Low-emphasis background for subtle supporting areas, typically used when both primary and secondary backgrounds are present, and an additional layer of distinction is needed.
  backgroundScrim= '#000000', // Semi-transparent underlay behind bottom sheets, modals, dialogs, and other temporary surfaces to dim the background.

  // text, icons, and other content
  contentPrimary= '#2E3338', // main content on primary background
  contentSecondary= '#757575', // supporting context on primary background
  contentTertiary= '#FFFFFF', // content on colored backgrounds
  textLink= '#757575', // underlined text links on primary background

  // borders, shadows, highlights, visual effects
  borderPrimary= '#E6E6E6', // Border color used to create emphasis or highlight key areas.
  borderSecondary= '#E6E6E6', // Border color used to define or separate secondary content.
  softShadow= 'rgba(156, 164, 169, 0.4)',
  lightShadow= 'rgba(48, 46, 37, 0.15)',
  barShadow= 'rgba(129, 134, 139, 0.5)',
  skeletonPlaceholderHighlight= '#FFFFFF', // animated highlight color on skeleton loaders
  skeletonPlaceholderBackground= '#E6E6E6', // background color on skeleton loaders
  loadingIndicator= '#1AB775', // spinner or loading indicator

  // interactive elements
  navigationTopPrimary= '#2E3338', // color for text and icons on top navigation
  navigationTopSecondary= '#757575', // secondary color for text and icons on top navigation
  navigationBottomPrimary= '#2E3338', // color for text and icons on bottom navigation
  navigationBottomSecondary= '#757575', // secondary color for text and icons on bottom navigation
  bottomSheetHandle= '#757575', // color for bottom sheet handle
  buttonPrimaryBackground= '#2E3338', // Background color for primary buttons (high-priority actions).
  buttonPrimaryContent= '#FFFFFF', // Text and icon color for primary buttons.
  buttonPrimaryBorder= '#2E3338', // Border color for primary buttons.
  buttonSecondaryBackground= '#F8F9F9', // Background color for secondary buttons (less emphasized actions).
  buttonSecondaryContent= '#2E3338', // Text and icon color for secondary buttons.
  buttonSecondaryBorder= '#E6E6E6', // Border color for secondary buttons.
  buttonTertiaryBackground= '#FFFFFF', // Background color for tertiary buttons (minimal or low-emphasis actions).
  buttonTertiaryContent= '#2E3338', // Text and icon color for tertiary buttons.
  buttonTertiaryBorder= '#E6E6E6', // Border color for tertiary buttons.
  buttonQuickActionBackground= '#F1FDF1', // Background color for quick action buttons (specialized high-priority actions).
  buttonQuickActionContent= '#137211', // Text and icon color for quick action buttons.
  buttonQuickActionBorder= '#F1FDF1', // Border color for quick action buttons.
  textInputBackground= '#FFFFFF', // Background color for text input fields.
  qrTabBarPrimary= '#2E3338', // color for text and icons on QR tab bar
  qrTabBarSecondary= '#FFFFFF', // secondary color for text and icons on QR tab bar

  // statuses and UI feedback colors
  disabled= '#E6E6E6', // Used for disabled elements that are non-interactive or visually de-emphasized.
  inactive= '#757575', // Represents inactive or placeholder elements, often less prominent but still visible.
  info= '#F8F9F9', // Background for neutral or informational states, typically non-critical.
  successPrimary= '#137211', // Indicates successful actions or positive states, often used for icons or highlights.
  successSecondary= '#F1FDF1', // Subtle background for success states, such as notifications or banners.
  warningPrimary= '#9C6E00', // Highlights warning states, used to draw attention to cautionary information.
  warningSecondary= '#FFF9EA', // Subtle background for warning states, providing gentle emphasis without overpowering.
  errorPrimary= '#C93717', // Represents error or failure states, used for critical feedback or alerts.
  errorSecondary= '#FBF2F0', // Subtle background for error states, providing softer emphasis in contexts like modals or notifications.

  // brand colors for decorative elements
  accent= '#1AB775', // Accent color for emphasizing key elements, such as highlights, icons, or decorative details.
  brandGradientLeft= '#26d98a', // Starting color for the brand gradient, used in backgrounds or borders to reinforce brand identity.
  brandGradientRight= '#ffd52c', // Ending color for the brand gradient, used in backgrounds or borders to reinforce brand identity.
  contentOnboardingComplete= '#FFFFFF', // Text and image color for onboarding completion screen

  // Map Colors
  activeMarker = '#D55C38',

  // Vendor Map Marker Colors
  inactiveVendor = '#D55C38',

  // Food Forest Marker Colors
  inactiveForest = '#68DB88',

  // Map Filter Buttons
  vendorButton = '#F07C4B',
  forestButton = '#307582',

  /** @deprecated */
  goldBrand = '#FBCC5C',
  /** @deprecated */
  onboardingBrownLight = '#A49B80',
  /** @deprecated */
  onboardingBackground = '#F9F6F0',
}

export default Colors
