import { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../theme/colors'
import { type Exam } from '../types'

interface ExamListItemProps {
  exam: Exam
  onPress?: (exam: Exam) => void
}

function Component({ exam, onPress }: ExamListItemProps) {
  const statusColor =
    exam.status === 'completed'
      ? colors.success
      : exam.status === 'pending'
        ? colors.warning
        : exam.status === 'requires_attention'
          ? colors.danger
          : colors.primary

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress ? () => onPress(exam) : undefined}
    >
      <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
      <View style={styles.content}>
        <Text style={styles.title}>{exam.modality}</Text>
        <Text style={styles.meta}>{exam.type} - Ordered by {exam.orderedBy}</Text>
        <Text style={styles.meta}>Created {new Date(exam.createdAt).toLocaleString()}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </TouchableOpacity>
  )
}

export const ExamListItem = memo(Component)

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 999
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text
  },
  meta: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2
  }
})
