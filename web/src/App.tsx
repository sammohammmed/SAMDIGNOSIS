import { useEffect, useMemo, useState } from 'react'
import './index.css'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { FileUploadCard } from './components/FileUploadCard'
import { AIResultsCard } from './components/AIResultsCard'
import { PatientHistoryTable } from './components/PatientHistoryTable'
import { ConfidenceBadge } from './components/ConfidenceBadge'
import { currentUser, patients } from './data/mockData'
import { type AIResult, type Patient } from './types'

const analysisMock = (files: File[], patient: Patient): AIResult => {
  const baseConfidence = Math.min(0.95, 0.6 + files.length * 0.08)
  return {
    primaryDiagnosis: `Automated assessment for the latest exam of ${patient.fullName}`,
    secondaryDiagnoses: [
      { label: 'No acute changes compared with previous studies', confidence: Math.max(0.45, baseConfidence - 0.2) },
      { label: 'Stable chronic findings across historical data', confidence: Math.max(0.4, baseConfidence - 0.25) }
    ],
    confidenceScore: baseConfidence,
    recommendations: [
      'Review findings with the supervising physician',
      'Schedule a follow-up appointment in approximately 4 weeks',
      'Upload the most recent lab panel for correlation'
    ],
    notes: `Processed ${files.length} file(s) successfully. SAM-Vision generated insights based on the uploaded dataset.`
  }
}

function App() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id ?? '')
  const selectedPatient = useMemo(
    () => patients.find((patient) => patient.id === selectedPatientId) ?? patients[0],
    [selectedPatientId]
  )
  const [selectedExamId, setSelectedExamId] = useState(selectedPatient?.exams[0]?.id)
  const [aiResult, setAiResult] = useState<AIResult | undefined>(selectedPatient?.exams[0]?.aiResult)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (!selectedPatient) return
    const defaultExamId = selectedPatient.exams[0]?.id
    setSelectedExamId(defaultExamId)
    setAiResult(selectedPatient.exams[0]?.aiResult)
  }, [selectedPatient?.id])

  useEffect(() => {
    if (!selectedPatient) return
    const exam = selectedPatient.exams.find((item) => item.id === selectedExamId)
    setAiResult(exam?.aiResult)
  }, [selectedExamId, selectedPatient])

  const handleAnalyze = async (files: File[]) => {
    if (!selectedPatient) return
    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 1800))
    const result = analysisMock(files, selectedPatient)
    setAiResult(result)
    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100">
      <Header user={currentUser} />
      <div className="mx-auto flex max-w-7xl flex-1 gap-6 px-6 pb-12 pt-8">
        <Sidebar current={activeNav} onNavigate={setActiveNav} />

        <main className="flex-1 space-y-8">
          <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-card md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Current Patient</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">{selectedPatient?.fullName}</h1>
                  <p className="text-sm text-slate-500">MRN: {selectedPatient?.mrn}</p>
                </div>
                {selectedPatient?.exams[0]?.aiResult ? (
                  <ConfidenceBadge confidence={selectedPatient.exams[0].aiResult.confidenceScore} />
                ) : null}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500">Switch Patient</label>
              <select
                value={selectedPatient?.id}
                onChange={(event) => setSelectedPatientId(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.fullName} - {patient.mrn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500">Total Exams</label>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{selectedPatient?.exams.length ?? 0}</p>
              <p className="text-xs text-slate-400">AI-assisted reviews</p>
            </div>
          </section>

          <FileUploadCard isAnalyzing={isAnalyzing} onAnalyze={handleAnalyze} />
          <AIResultsCard result={aiResult} isAnalyzing={isAnalyzing} />

          {selectedPatient ? (
            <PatientHistoryTable
              patient={selectedPatient}
              selectedExamId={selectedExamId}
              onSelectExam={setSelectedExamId}
            />
          ) : null}
        </main>
      </div>
    </div>
  )
}

export default App
