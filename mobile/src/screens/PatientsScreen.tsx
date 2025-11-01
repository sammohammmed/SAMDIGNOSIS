import { useCallback } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { Screen } from '../components/Screen'
import { PatientListItem } from '../components/PatientListItem'
import { colors } from '../theme/colors'
import { fetchPatients } from '../services/api'
import { useAsyncData } from '../hooks/useAsyncData'
import { type Patient } from '../types'
import { useNavigation } from '@react-navigation/native'

export function PatientsScreen() {
  const navigation = useNavigation()
  const query = useAsyncData(fetchPatients)

  const navigateToPatient = useCallback(
    (patient: Patient) => {
      // @ts-expect-error navigation params are defined in navigator
      navigation.navigate('PatientDetail', { patientId: patient.id, patientName: patient.fullName })
    },
    [navigation]
  )

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.heading}>Patients</Text>
        <Text style={styles.meta}>Tap a patient to review AI-assisted exam history</Text>
      </View>

      {query.loading && !query.data ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : query.error ? (
        <View style={styles.centered}>
          <Text style={styles.error}>{query.error}</Text>
        </View>
      ) : (
        <FlatList
          data={query.data ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PatientListItem
              patient={{ ...item, examsCount: (item as any).examsCount ?? 0 }}
              onPress={navigateToPatient}
            />
          )}
          refreshControl={<RefreshControl refreshing={query.loading} onRefresh={query.refetch} />}
          ListEmptyComponent={<Text style={styles.meta}>No patients registered yet.</Text>}
          contentContainerStyle={styles.listPadding}
        />
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text
  },
  meta: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4
  },
  listPadding: {
    paddingBottom: 40
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    color: colors.danger,
    textAlign: 'center'
  }
})
