import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

type Diagnosis = {
  label: string;
  confidence: number;
  notes?: string;
};

type AIResultsCardProps = {
  primary: Diagnosis;
  secondary?: Diagnosis[];
  recommendations?: string[];
};

const ConfidenceBadge: React.FC<{ confidence: number }> = ({ confidence }) => {
  const percentage = Math.round(confidence * 100);
  const level = percentage > 80 ? colors.success : percentage > 60 ? colors.warning : colors.accent;
  return (
    <View className="px-3 py-1 rounded-full" style={{ backgroundColor: `${level}20` }}>
      <Text className="text-xs font-semibold" style={{ color: level }}>
        مستوى الثقة: {percentage}%
      </Text>
    </View>
  );
};

const DiagnosisRow: React.FC<{ diagnosis: Diagnosis; isPrimary?: boolean }> = ({ diagnosis, isPrimary }) => (
  <View className="flex-row items-start justify-between bg-surface rounded-2xl p-4 mb-3 border border-gray-100">
    <View className="flex-1 pr-3">
      <Text className={`font-semibold ${isPrimary ? 'text-lg text-gray-900' : 'text-base text-gray-700'}`}>
        {diagnosis.label}
      </Text>
      {diagnosis.notes ? <Text className="text-xs text-gray-500 mt-1">{diagnosis.notes}</Text> : null}
    </View>
    <ConfidenceBadge confidence={diagnosis.confidence} />
  </View>
);

const AIResultsCard: React.FC<AIResultsCardProps> = ({ primary, secondary, recommendations }) => {
  return (
    <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <View className="flex-row items-center mb-4">
        <MaterialIcons name="science" size={22} color={colors.primary} />
        <Text className="text-lg font-semibold text-gray-900 ml-2">نتائج الذكاء الاصطناعي</Text>
      </View>

      <DiagnosisRow diagnosis={primary} isPrimary />

      {secondary && secondary.length ? (
        <View className="mt-4">
          <Text className="text-sm text-gray-500 mb-3">تشخيصات ثانوية محتملة</Text>
          {secondary.map((item) => (
            <DiagnosisRow key={item.label} diagnosis={item} />
          ))}
        </View>
      ) : null}

      {recommendations && recommendations.length ? (
        <View className="mt-6 bg-surface border border-accent/30 rounded-2xl p-4">
          <View className="flex-row items-center mb-3">
            <MaterialIcons name="medical-services" size={20} color={colors.secondary} />
            <Text className="text-base font-semibold text-secondary ml-2">توصيات طبية مقترحة</Text>
          </View>
          {recommendations.map((recommendation, index) => (
            <View key={recommendation} className="flex-row mb-2">
              <Text className="text-accent font-semibold ml-2">{index + 1}.</Text>
              <Text className="text-gray-700 flex-1">{recommendation}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default AIResultsCard;
