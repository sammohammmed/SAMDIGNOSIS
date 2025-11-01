import { useMemo } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Screen } from '../components/Screen'
import { StatsCard } from '../components/StatsCard'
import { ExamListItem } from '../components/ExamListItem'
import { colors } from '../theme/colors'
import { fetchExams, fetchPatients } from '../services/api'
import { useAsyncData } from '../hooks/useAsyncData'
import { type Exam } from '../types'

export function DashboardScreen() {
  const patientsQuery = useAsyncData(fetchPatients)
  const examsQuery = useAsyncData(fetchExams)

  const latestExams = useMemo(() => {
    if (!examsQuery.data) return [] as Array<Exam & { patient: { fullName: string } | null }>
    return examsQuery.data
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }, [examsQuery.data])

  const completedExams = examsQuery.data?.filter((exam) => exam.status === 'completed').length ?? 0
  const inReviewExams = examsQuery.data?.filter((exam) => exam.status === 'in_review').length ?? 0

  const isLoading = patientsQuery.loading || examsQuery.loading
  const hasError = patientsQuery.error || examsQuery.error

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.heading}>SAMDIAGNOSIS</Text>
        <Text style={styles.subheading}>Smart AI Medical Diagnostic Platform</Text>
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.meta}>Loading analytics...</Text>
        </View>
      ) : hasError ? (
        <View style={styles.centered}>
          <Text style={styles.error}>Unable to load dashboard data. Please pull to refresh.</Text>
        </View>
      ) : (
        <>
          <View style={styles.statsRow}>
            <StatsCard
              title="Active Patients"
              value={String(patientsQuery.data?.length ?? 0)}
              subtitle="Across all departments"
              icon={<Ionicons name="people-outline" size={20} color={colors.primary} />}
            />
            <StatsCard
              title="Completed Exams"
              value={String(completedExams)}
              subtitle="Within the last 30 days"
              icon={<Ionicons name="shield-checkmark-outline" size={20} color={colors.success} />}
              tone="success"
            />
            <StatsCard
              title="In Review"
              value={String(inReviewExams)}
              subtitle="Awaiting clinician sign-off"
              icon={<Ionicons name="hourglass-outline" size={20} color={colors.warning} />}
              tone="warning"
            />
          </View>

          <Text style={styles.sectionTitle}>Recent AI-assisted exams</Text>
          <FlatList
            data={latestExams}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExamListItem exam={item} onPress={() => {}} />
            )}
            ListEmptyComponent={<Text style={styles.meta}>No exams available yet.</Text>}
            contentContainerStyle={styles.listPadding}
          />
        </>
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text
  },
  subheading: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4
  },
  statsRow: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text
  },
  listPadding: {
    paddingTop: 16,
    paddingBottom: 40
  },
  meta: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 8
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    color: colors.danger,
    textAlign: 'center',
    paddingHorizontal: 20
  }
})
