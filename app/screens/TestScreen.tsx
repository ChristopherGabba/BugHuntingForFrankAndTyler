import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text } from "app/components"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"


interface TestScreenProps extends AppStackScreenProps<"Test"> {}

export const TestScreen: FC<TestScreenProps> = observer(function TestScreen(_props) {
  const { navigation, route } = _props
  const { episode } = route.params

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Text
          text={episode.title}
          style={$welcomeHeading}
        />
  
      </View>

    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
