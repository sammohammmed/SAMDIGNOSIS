import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AIResultsCard from '../components/AIResultsCard';
import { mockAnalysisResults } from '../data/mockData';
import { RootStackParamList } from '../navigation';
import { colors } from '../styles/colors';

type AnalysisRouteProp = RouteProp<RootStackParamList, 'Analysis'>;

const AnalysisScreen: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute<AnalysisRouteProp>();

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 24 }}>
      <TouchableOpacity className="flex-row items-center mb-4" onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={20} color={colors.primary} />
        <Text className="text-primary font-semibold mr-2">عودة</Text>
      </TouchableOpacity>

      <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <Text className="text-lg font-semibold text-gray-900">ملف التحليل</Text>
        <Text className="text-sm text-gray-500 mt-2">{params.fileName}</Text>
        <Text className="text-xs text-gray-400 mt-1" selectable>
          المسار المؤقت: {params.fileUri || 'تم التحميل داخل الجهاز'}
        </Text>
      </View>

      <AIResultsCard
        primary={mockAnalysisResults.primary}
        secondary={mockAnalysisResults.secondary}
        recommendations={mockAnalysisResults.recommendations}
      />

      <View className="mt-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-3">ملفات مرتبطة</Text>
        <Text className="text-sm text-gray-500">
          سيتم إظهار نتائج الفحوصات السابقة والمرجعية بعد ربط النظام بقواعد البيانات الفعلية.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AnalysisScreen;
