import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Screen } from '../components/Screen'
import { colors } from '../theme/colors'

export function SettingsScreen() {
  return (
    <Screen>
      <View style={styles.section}>
        <Text style={styles.heading}>Settings & Support</Text>
        <Text style={styles.meta}>Configure environment variables and review platform disclaimers.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Backend API URL</Text>
        <Text style={styles.cardSubtitle}>
          Set <Text style={styles.mono}>EXPO_PUBLIC_API_URL</Text> to the running backend endpoint when building a
          production APK.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Clinical Disclaimer</Text>
        <Text style={styles.cardSubtitle}>
          AI results are decision-support only and must be verified by a licensed clinician before any medical action.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => Linking.openURL('https://samdiagnosis.example.com/docs')}
      >
        <Text style={styles.linkText}>View integration documentation</Text>
      </TouchableOpacity>
    </Screen>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text
  },
  meta: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 6
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.muted
  },
  mono: {
    fontFamily: 'Courier New'
  },
  linkButton: {
    marginTop: 12
  },
  linkText: {
    color: colors.primary,
    fontWeight: '600'
  }
})
