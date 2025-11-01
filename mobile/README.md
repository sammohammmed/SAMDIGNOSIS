# SAMDIAGNOSIS Mobile (Expo / React Native)

هذا المشروع يمثل النسخة المبدئية من تطبيق SAMDIAGNOSIS للأجهزة المحمولة، مبنية باستخدام **Expo SDK 51** و**React Native** مع دعم تصميم يشبه Tailwind عبر NativeWind. التطبيق يوفر شاشات تجريبية لرفع الملفات، عرض نتائج التحليل الذكي، واستعراض سجل المرضى باستخدام بيانات وهمية (Mock Data).

## المتطلبات المسبقة
- Node.js الإصدار 18 أو أعلى.
- Expo CLI (`npm install -g expo-cli`) أو استخدام `npx expo` مباشرة.
- حساب Expo (مطلوب فقط عند بناء ملفات APK عبر EAS).

## تشغيل التطبيق محليًا
```bash
cd mobile
npm install
npm run start          # ثم اختر تشغيل Android أو iOS أو Web
```

## بناء ملف APK
### الخيار 1: Expo EAS Build (موصى به)
1. تثبيت EAS CLI:
   ```bash
   npm install -g eas-cli
   ```
2. تسجيل الدخول:
   ```bash
   eas login
   ```
3. تهيئة EAS لأول مرة:
   ```bash
   cd mobile
   eas build:configure
   ```
4. إنشاء ملف APK (حزمة Android):
   ```bash
   eas build --platform android --profile preview --local
   ```
   - لإرسال البناء إلى سحابة Expo بدل البناء المحلي، احذف `--local`.
   - بعد اكتمال البناء ستحصل على رابط لتحميل ملف APK.

### الخيار 2: بناء محلي عبر Gradle (بعد عمل `expo prebuild`)
1. تحويل المشروع إلى مشروع أصلي:
   ```bash
   cd mobile
   npx expo prebuild --platform android
   ```
2. تثبيت الاعتمادات داخل مجلد android.
3. تنفيذ أمر Gradle لإصدار APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
4. ستجد ملف APK داخل `android/app/build/outputs/apk/release/`.

> **ملاحظة أمنية:** قبل إصدار نسخة إنتاجية يجب ضبط شهادات التوقيع، مفاتيح EAS، وسياسات الوصول للملفات، بالإضافة إلى ربط التطبيق بواجهات الواجهة الخلفية (Firebase، GCS، AI API) وتفعيل المصادقة الآمنة.

## الهيكلية الرئيسية
- `App.tsx`: نقطة الدخول وتحديد الثيم والتوجيه الملاحي.
- `src/navigation`: تعريف التوجيه بين الشاشات.
- `src/screens`: شاشات التطبيق (`Home`, `Analysis`, `History`).
- `src/components`: مكونات الواجهة مثل بطاقة رفع الملفات وبطاقة النتائج.
- `src/data/mockData.ts`: بيانات وهمية لتجربة الواجهة.

سيتم لاحقًا ربط التطبيق بخدمات الذكاء الاصطناعي الحقيقية وواجهات التخزين والحماية المطلوبة.
