import { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Screen } from '../components/Screen'
import { ExamListItem } from '../components/ExamListItem'
import { colors } from '../theme/colors'
import { analyzeExam, fetchPatientDetail } from '../services/api'
import { useAsyncData } from '../hooks/useAsyncData'
import { type Exam } from '../types'

type RouteParams = {
  PatientDetail: {
    patientId: string
    patientName: string
  }
}

export function PatientDetailScreen() {
  const route = useRoute<RouteProp<RouteParams, 'PatientDetail'>>()
  const navigation = useNavigation()
  const [processingExamId, setProcessingExamId] = useState<string | null>(null)

  const query = useAsyncData(() => fetchPatientDetail(route.params.patientId))

  const patient = query.data?.patient
  const exams = query.data?.exams ?? []

  const runAnalysis = useCallback(
    async (exam: Exam) => {
      try {
        setProcessingExamId(exam.id)
        await analyzeExam(exam.id)
        await query.refetch()
        Alert.alert('Analysis complete', 'The AI results have been updated for this exam.')
      } catch (error) {
        Alert.alert('Analysis failed', error instanceof Error ? error.message : 'Unknown error occurred')
      } finally {
        setProcessingExamId(null)
      }
    },
    [query]
  )

  const header = useMemo(() => {
    if (!patient) return null
    return (
      <View style={styles.profileCard}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={colors.surface} />
          </View>
          <View style={styles.profileMeta}>
            <Text style={styles.patientName}>{patient.fullName}</Text>
            <Text style={styles.meta}>MRN {patient.mrn}</Text>
            <Text style={styles.meta}>DOB {patient.dateOfBirth}</Text>
          </View>
        </View>
        <View style={styles.tagsRow}>
          <View style={styles.tag}>
            <Ionicons name="water-outline" size={14} color={colors.primary} />
            <Text style={styles.tagLabel}>Blood {patient.bloodType}</Text>
          </View>
          <View style={styles.tag}>
            <Ionicons name="medkit-outline" size={14} color={colors.primary} />
            <Text style={styles.tagLabel}>{patient.conditions.join(', ') || 'No chronic conditions'}</Text>
          </View>
        </View>
      </View>
    )
  }, [navigation, patient])

  return (
    <Screen>
      {query.loading && !patient ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : query.error ? (
        <View style={styles.centered}>
          <Text style={styles.error}>{query.error}</Text>
        </View>
      ) : (
        <FlatList
          data={exams}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={header}
          renderItem={({ item }) => (
            <View style={styles.examCard}>
              <ExamListItem exam={item} />
              <TouchableOpacity
                style={styles.analyzeBtn}
                onPress={() => runAnalysis(item)}
                disabled={processingExamId === item.id}
              >
                {processingExamId === item.id ? (
                  <ActivityIndicator size="small" color={colors.surface} />
                ) : (
                  <>
                    <Ionicons name="sparkles-outline" size={16} color={colors.surface} />
                    <Text style={styles.analyzeText}>Run AI Analysis</Text>
                  </>
                )}
              </TouchableOpacity>
              {item.aiResult ? (
                <View style={styles.aiResult}>
                  <Text style={styles.aiHeading}>AI Summary</Text>
                  <Text style={styles.summary}>{item.aiResult.primaryDiagnosis}</Text>
                  <Text style={styles.summaryMeta}>
                    Confidence {Math.round(item.aiResult.confidenceScore * 100)}%
                  </Text>
                </View>
              ) : null}
            </View>
          )}
          refreshControl={<RefreshControl refreshing={query.loading} onRefresh={query.refetch} />}
          ListEmptyComponent={<Text style={styles.meta}>No exams recorded for this patient yet.</Text>}
          contentContainerStyle={styles.listPadding}
        />
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    color: colors.danger,
    textAlign: 'center'
  },
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  backButton: {
    position: 'absolute',
    top: 16,
    right: 16
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileMeta: {
    flex: 1
  },
  patientName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text
  },
  meta: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4
  },
  tagsRow: {
    marginTop: 16,
    gap: 8
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  tagLabel: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600'
  },
  listPadding: {
    paddingBottom: 60
  },
  examCard: {
    marginBottom: 12
  },
  analyzeBtn: {
    marginTop: -8,
    marginLeft: 60,
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryDark,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  analyzeText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '600'
  },
  aiResult: {
    marginTop: 12,
    marginLeft: 60,
    backgroundColor: '#F1FAF6',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1F2E5'
  },
  aiHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.success,
    marginBottom: 4
  },
  summary: {
    fontSize: 13,
    color: colors.text
  },
  summaryMeta: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 6
  }
})
