import { ReactNode } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { colors } from '../theme/colors'

interface StatsCardProps {
  title: string
  value: string
  subtitle?: string
  icon?: ReactNode
  tone?: 'primary' | 'success' | 'warning'
}

export function StatsCard({ title, value, subtitle, icon, tone = 'primary' }: StatsCardProps) {
  const toneColor = tone === 'success' ? colors.success : tone === 'warning' ? colors.warning : colors.primary

  return (
    <View style={[styles.card, { borderColor: toneColor }]}> 
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {icon}
      </View>
      <Text style={[styles.value, { color: toneColor }]}>{value}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.muted,
    textTransform: 'uppercase'
  },
  value: {
    fontSize: 28,
    fontWeight: '700'
  },
  subtitle: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4
  }
})
