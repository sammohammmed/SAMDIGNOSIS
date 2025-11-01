import { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../theme/colors'
import { type Patient } from '../types'

interface PatientListItemProps {
  patient: Patient & { examsCount?: number }
  onPress: (patient: Patient) => void
}

function Component({ patient, onPress }: PatientListItemProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(patient)}>
      <View style={styles.avatar}>
        <Ionicons name="person-outline" size={20} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{patient.fullName}</Text>
        <Text style={styles.meta}>MRN {patient.mrn}</Text>
        <Text style={styles.meta}>Last visit {patient.lastVisit}</Text>
      </View>
      <View style={styles.badge}>
        <Ionicons name="document-text-outline" size={16} color={colors.surface} />
        <Text style={styles.badgeText}>{patient.examsCount ?? 0}</Text>
      </View>
    </TouchableOpacity>
  )
}

export const PatientListItem = memo(Component)

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E0F4FB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    marginHorizontal: 12
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text
  },
  meta: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999
  },
  badgeText: {
    color: colors.surface,
    fontWeight: '600'
  }
})
