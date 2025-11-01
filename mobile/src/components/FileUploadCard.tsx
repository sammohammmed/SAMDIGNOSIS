import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

type FileUploadCardProps = {
  fileName?: string | null;
  onPickFile: () => void;
  onAnalyze: () => void;
  onReset?: () => void;
  isAnalyzing: boolean;
};

const FileUploadCard: React.FC<FileUploadCardProps> = ({
  fileName,
  onPickFile,
  onAnalyze,
  onReset,
  isAnalyzing,
}) => {
  return (
    <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <Text className="text-lg font-semibold text-gray-900">رفع ملف طبي</Text>
      <Text className="text-sm text-gray-500 mt-1">
        يدعم النظام صور الأشعة (PNG, JPG, DICOM) ونتائج المختبر (CSV, Excel).
      </Text>

      <TouchableOpacity
        onPress={onPickFile}
        className="mt-4 border-2 border-dashed border-primary/40 rounded-2xl py-8 items-center justify-center"
      >
        <MaterialCommunityIcons name="cloud-upload-outline" size={42} color={colors.primary} />
        <Text className="text-primary font-semibold mt-3">
          {fileName ? 'تغيير الملف' : 'اختر ملفًا للرفع'}
        </Text>
        {fileName ? <Text className="text-gray-500 mt-2">{fileName}</Text> : null}
      </TouchableOpacity>

      <View className="flex-row mt-5">
        <TouchableOpacity
          onPress={onAnalyze}
          disabled={!fileName || isAnalyzing}
          className={`flex-1 rounded-2xl py-3 items-center ${
            !fileName || isAnalyzing ? 'bg-primary/40' : 'bg-primary'
          }`}
        >
          <Text className="text-white text-base font-semibold">
            {isAnalyzing ? '...جاري التحليل' : 'تشغيل التحليل'}
          </Text>
        </TouchableOpacity>

        {fileName && onReset ? (
          <TouchableOpacity
            onPress={onReset}
            disabled={isAnalyzing}
            className="ml-3 px-4 py-3 rounded-2xl border border-gray-200 items-center justify-center"
          >
            <Text className="text-gray-600 text-base">إعادة تعيين</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default FileUploadCard;
