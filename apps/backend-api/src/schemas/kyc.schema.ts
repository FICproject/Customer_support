import { z } from 'zod';

export const KYCSubmitSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  documentType: z.enum(['PASSPORT', 'AADHAAR', 'DRIVING_LICENSE', 'PAN_CARD', 'NATIONAL_ID']),
  documentNumber: z.string().min(4, 'Document number is required'),
  ocrRawText: z.string().optional(),
  imagePayloadBase64: z.string().optional()
});

export type KYCSubmitInput = z.infer<typeof KYCSubmitSchema>;

export const KYCOverrideSchema = z.object({
  reviewedByTL: z.string().optional(),
  decision: z.enum(['PENDING', 'DOCUMENT_SUBMITTED', 'OCR_VERIFIED', 'FACE_MATCHED', 'APPROVED', 'REJECTED', 'NEEDS_MANUAL_REVIEW']),
  notes: z.string().min(3, 'Review notes must be at least 3 characters')
});

export type KYCOverrideInput = z.infer<typeof KYCOverrideSchema>;
