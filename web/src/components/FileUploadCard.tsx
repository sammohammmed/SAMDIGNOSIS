import { ChangeEvent, useMemo, useState } from 'react'
import { CloudUpload, Loader2, ShieldCheck, Trash2 } from 'lucide-react'
import clsx from 'classnames'

type UploadableFile = {
  id: string
  file: File
}

const ACCEPTED_TYPES = {
  images: ['image/png', 'image/jpeg'],
  dicom: ['application/dicom', 'application/dicom+json', 'application/octet-stream'],
  lab: [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
}

interface FileUploadCardProps {
  isAnalyzing: boolean
  onAnalyze: (files: File[]) => Promise<void> | void
}

function humanFileSize(size: number) {
  if (size === 0) return '0 B'
  const i = Math.floor(Math.log(size) / Math.log(1024))
  return `${(size / Math.pow(1024, i)).toFixed(1)} ${['B', 'KB', 'MB', 'GB'][i] ?? 'B'}`
}

export function FileUploadCard({ isAnalyzing, onAnalyze }: FileUploadCardProps) {
  const [files, setFiles] = useState<UploadableFile[]>([])
  const [error, setError] = useState<string | null>(null)

  const totalSize = useMemo(
    () => files.reduce((acc, { file }) => acc + file.size, 0),
    [files]
  )

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? [])
    if (selected.length === 0) return

    const filtered = selected.filter((file) => {
      const isAccepted = Object.values(ACCEPTED_TYPES).some((types) => types.includes(file.type))
      if (!isAccepted) {
        setError(`File type for ${file.name} is not supported.`)
      }
      return isAccepted
    })

    const newFiles = filtered.map((file) => ({ id: crypto.randomUUID(), file }))
    setFiles((prev) => [...prev, ...newFiles])
    setError(null)
    event.target.value = ''
  }

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setError('Please select at least one file before starting the analysis.')
      return
    }
    setError(null)
    await onAnalyze(files.map(({ file }) => file))
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Medical File Upload</h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
            Upload radiology images (DICOM/JPG/PNG) or lab results (CSV/Excel). Files are encrypted prior to cloud storage to comply with healthcare security standards.
          </p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-primary/50 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition hover:border-primary hover:bg-primary/10">
          <CloudUpload className="h-5 w-5" aria-hidden />
          <span>Select Files</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept={Object.values(ACCEPTED_TYPES).flat().join(',')}
          />
        </label>
      </div>

      {error ? (
        <div className="mt-4 rounded-lg border border-danger/20 bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </div>
      ) : null}

      <div className="mt-6 grid gap-3">
        {files.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
            <p className="text-sm text-slate-500">
              No files uploaded yet. Start by adding DICOM studies, diagnostic images, or laboratory data to run through the AI pipeline.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {files.map(({ id, file }) => (
              <div
                key={id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">{file.name}</p>
                  <p className="text-xs text-slate-500">{file.type || 'Unknown type'} - {humanFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(id)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-danger"
                  aria-label={`Remove ${file.name}`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-success" aria-hidden />
          <span>Files are encrypted before storage. Total selected size: {humanFileSize(totalSize)}</span>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setFiles([])}
            className={clsx(
              'rounded-xl border px-4 py-2 text-sm font-semibold transition',
              files.length === 0
                ? 'cursor-not-allowed border-slate-200 text-slate-300'
                : 'border-slate-200 text-slate-500 hover:bg-slate-100'
            )}
            disabled={files.length === 0}
          >
            Clear List
          </button>
          <button
            type="button"
            onClick={handleAnalyze}
            className={clsx(
              'flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white transition',
              isAnalyzing ? 'cursor-wait opacity-70' : 'hover:bg-primary-dark'
            )}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            <span>{isAnalyzing ? 'Running analysis...' : 'Run Analysis'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
