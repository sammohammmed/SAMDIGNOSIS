import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Calendar, ClipboardSignature, Download, FileStack, FileText } from 'lucide-react'
import clsx from 'classnames'
import { type Patient } from '../types'
import { ConfidenceBadge } from './ConfidenceBadge'

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

interface PatientHistoryTableProps {
  patient: Patient
  selectedExamId?: string
  onSelectExam: (examId: string) => void
}

const statusMap: Record<string, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning' },
  in_review: { label: 'In Review', className: 'bg-primary/10 text-primary' },
  completed: { label: 'Completed', className: 'bg-success/10 text-success' },
  requires_attention: { label: 'Needs Attention', className: 'bg-danger/10 text-danger' }
}

export function PatientHistoryTable({ patient, selectedExamId, onSelectExam }: PatientHistoryTableProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Patient Exam History</h2>
          <p className="text-sm text-slate-500">{patient.fullName} - {patient.mrn}</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          Last visit: {dayjs(patient.lastVisit).format('DD MMM YYYY')} ({dayjs(patient.lastVisit).fromNow()})
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
        <table className="min-w-full divide-y divide-slate-100 text-right">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Exam</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Update</th>
              <th className="px-4 py-3">AI Insight</th>
              <th className="px-4 py-3">Files</th>
              <th className="px-4 py-3" aria-label="Actions" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-600">
            {patient.exams.map((exam) => {
              const status = statusMap[exam.status]
              return (
                <tr
                  key={exam.id}
                  className={clsx(
                    'cursor-pointer transition hover:bg-primary/5',
                    selectedExamId === exam.id ? 'bg-primary/10' : undefined
                  )}
                  onClick={() => onSelectExam(exam.id)}
                >
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {dayjs(exam.createdAt).format('DD MMM YYYY, HH:mm')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <FileStack className="h-4 w-4 text-primary" aria-hidden />
                      <div className="text-right">
                        <p className="font-semibold text-slate-800">{exam.type}</p>
                        <p className="text-xs text-slate-400">{exam.modality}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}>
                      <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-slate-400">
                      Updated {dayjs(exam.createdAt).fromNow()}
                      {exam.lastReviewedBy ? (
                        <p className="text-[11px] text-slate-400">Reviewed by {exam.lastReviewedBy}</p>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {exam.aiResult ? (
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500">{exam.aiResult.primaryDiagnosis}</p>
                        <ConfidenceBadge confidence={exam.aiResult.confidenceScore} />
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">Analysis pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center justify-end gap-2 text-xs text-slate-500">
                      {exam.files.map((file) => (
                        <span
                          key={file.id}
                          className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1"
                        >
                          <FileText className="h-3.5 w-3.5" aria-hidden />
                          {file.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:border-primary hover:bg-primary/10 hover:text-primary"
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden />
                      Report
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600 md:grid-cols-3">
        <div className="flex items-center gap-2">
          <ClipboardSignature className="h-5 w-5 text-primary" aria-hidden />
          <div>
            <p className="font-semibold text-slate-800">Allergies</p>
            <p>{patient.allergies.join(', ') || 'None recorded'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FileStack className="h-5 w-5 text-primary" aria-hidden />
          <div>
            <p className="font-semibold text-slate-800">Chronic Conditions</p>
            <p>{patient.conditions.join(', ') || 'None recorded'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" aria-hidden />
          <div>
            <p className="font-semibold text-slate-800">Upcoming Appointments</p>
            <ul className="list-disc pr-5 text-xs text-slate-500">
              {patient.upcomingAppointments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
