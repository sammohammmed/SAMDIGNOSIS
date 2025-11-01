import type { Request, Response } from 'express'
import { z } from 'zod'
import { ok, fail } from '@utils/response'

const analyzeSchema = z.object({
  patientId: z.string().optional(),
  modality: z.string().min(2),
  files: z
    .array(
      z.object({
        name: z.string(),
        type: z.enum(['dicom', 'image', 'lab']),
        size: z.number().optional()
      })
    )
    .min(1)
})

export function analyzePayload(req: Request, res: Response) {
  const parsed = analyzeSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json(fail('Invalid AI analysis payload', 'VALIDATION_ERROR'))
  }

  const { modality, files, patientId } = parsed.data
  const confidence = 0.6 + Math.random() * 0.3

  return res.json(
    ok({
      patientId: patientId ?? null,
      modality,
      summary: `AI-generated insights for ${modality} upload`,
      confidence: Number(confidence.toFixed(2)),
      secondaryFindings: [
        { label: 'No emergent risk indicators', confidence: Math.max(0.4, confidence - 0.25) },
        { label: 'Recommend human-in-the-loop validation', confidence: 0.5 }
      ],
      filesAnalyzed: files.length,
      turnaroundMs: Math.floor(750 + Math.random() * 500)
    })
  )
}
