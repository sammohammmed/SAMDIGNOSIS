import { HistoryItem } from '../components/PatientHistoryList';

export const mockHistory: HistoryItem[] = [
  {
    id: 'HX-1001',
    patientName: 'سارة الأحمد',
    examType: 'أشعة صدر (X-Ray)',
    date: '2025-10-12',
    status: 'reviewed',
    confidence: 0.92,
  },
  {
    id: 'HX-1002',
    patientName: 'محمد الحارث',
    examType: 'تحاليل دم (CBC)',
    date: '2025-10-09',
    status: 'pending',
    confidence: 0.76,
  },
  {
    id: 'HX-1003',
    patientName: 'نورة السالم',
    examType: 'أشعة مقطعية (CT)',
    date: '2025-10-05',
    status: 'needs_attention',
    confidence: 0.58,
  },
];

export const mockAnalysisResults = {
  primary: {
    label: 'التهاب رئوي نمطي',
    confidence: 0.87,
    notes: 'تم رصد تعتيم في الفص السفلي للرئة اليمنى متوافق مع التهاب رئوي.'
  },
  secondary: [
    {
      label: 'قصور قلب احتقاني مبكر',
      confidence: 0.62,
      notes: 'علامات خفيفة لتضخم القلب يُنصح بمراجعة التاريخ المرضي.'
    },
    {
      label: 'تليف رئوي محدود',
      confidence: 0.41,
      notes: 'مؤشرات طفيفة لتغيرات تليفية، تحتاج إلى تصوير إضافي للتأكيد.'
    }
  ],
  recommendations: [
    'إجراء تصوير مقطعي عالي الدقة خلال 48 ساعة للتأكيد.',
    'بدء مضاد حيوي واسع الطيف بعد استشارة أخصائي الأمراض الصدرية.',
    'إجراء اختبار وظائف الرئة ومتابعة نسبة الأكسجين بشكل يومي.'
  ]
};
