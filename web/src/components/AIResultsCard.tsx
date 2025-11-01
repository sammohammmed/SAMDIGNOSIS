import { Activity, Bot, FileText, Stethoscope } from 'lucide-react'
import { type AIResult } from '../types'
import { ConfidenceBadge } from './ConfidenceBadge'

interface AIResultsCardProps {
  result?: AIResult
  isAnalyzing: boolean
}

export function AIResultsCard({ result, isAnalyzing }: AIResultsCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">AI Analysis Results</h2>
          <p className="mt-1 text-sm text-slate-500">
            Results update automatically when an analysis finishes. The card below highlights the primary diagnosis, alternate considerations, and supporting recommendations.
          </p>
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Bot className="mr-1 inline h-4 w-4" aria-hidden />
          SAM-Vision v1.2 Engine
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-white p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">Primary Diagnosis</p>
                <h3 className="text-lg font-semibold text-slate-900">
                  {isAnalyzing ? 'Running inference...' : result?.primaryDiagnosis ?? 'Select an exam to view AI insight'}
                </h3>
                {result?.notes ? (
                  <p className="text-sm leading-relaxed text-slate-600">{result.notes}</p>
                ) : null}
              </div>
              {result ? <ConfidenceBadge confidence={result.confidenceScore} /> : null}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white">
            <header className="flex items-center gap-2 border-b border-slate-100 px-5 py-3">
              <Activity className="h-5 w-5 text-primary" aria-hidden />
              <h4 className="text-sm font-semibold text-slate-800">Secondary Considerations</h4>
            </header>
            <ul className="divide-y divide-slate-100">
              {result?.secondaryDiagnoses?.length ? (
                result.secondaryDiagnoses.map((diagnosis) => (
                  <li key={diagnosis.label} className="flex items-center justify-between px-5 py-3 text-sm text-slate-600">
                    <span>{diagnosis.label}</span>
                    <ConfidenceBadge confidence={diagnosis.confidence} />
                  </li>
                ))
              ) : (
                <li className="px-5 py-4 text-sm text-slate-400">No secondary interpretations available.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-success/20 bg-success/5 p-4">
            <div className="flex items-center gap-2 text-success">
              <Stethoscope className="h-5 w-5" aria-hidden />
              <span className="text-sm font-semibold">Clinical Recommendations</span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-success/90">
              {result?.recommendations?.length ? (
                result.recommendations.map((item) => (
                  <li key={item} className="rounded-lg bg-white/80 px-3 py-2 shadow-sm">
                    {item}
                  </li>
                ))
              ) : (
                <li className="rounded-lg bg-white/70 px-3 py-2 text-success/60">No suggestions yet.</li>
              )}
            </ul>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
          >
            <FileText className="h-5 w-5" aria-hidden />
            Download PDF Report
          </button>
        </div>
      </div>
    </section>
  )
}
