interface ConfidenceBadgeProps {
  confidence: number
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const percentage = Math.round(confidence * 100)
  const color =
    percentage >= 80 ? 'bg-success/10 text-success' : percentage >= 50 ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}>
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
      {percentage}% confidence
    </span>
  )
}
