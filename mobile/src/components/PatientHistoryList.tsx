import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

export type HistoryItem = {
  id: string;
  patientName: string;
  examType: string;
  date: string;
  status: 'reviewed' | 'pending' | 'needs_attention';
  confidence: number;
};

type PatientHistoryListProps = {
  data: HistoryItem[];
};

const STATUS_LABELS: Record<HistoryItem['status'], { label: string; color: string }> = {
  reviewed: { label: 'تمت المراجعة', color: colors.success },
  pending: { label: 'قيد المراجعة', color: colors.warning },
  needs_attention: { label: 'تحتاج مراجعة', color: '#E53E3E' },
};

const PatientHistoryList: React.FC<PatientHistoryListProps> = ({ data }) => {
  return (
    <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <View className="flex-row items-center mb-4">
        <MaterialCommunityIcons name="clipboard-text-outline" size={22} color={colors.secondary} />
        <Text className="text-lg font-semibold text-gray-900 ml-2">سجل المرضى</Text>
      </View>

      <FlatList
        scrollEnabled={false}
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="border-b border-gray-100 my-2" />}
        renderItem={({ item }) => {
          const status = STATUS_LABELS[item.status];
          return (
            <View className="py-2">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900">{item.patientName}</Text>
                  <Text className="text-xs text-gray-500 mt-1">{item.examType}</Text>
                </View>
                <View className="items-end">
                  <View className="px-3 py-1 rounded-full mb-1" style={{ backgroundColor: `${status.color}20` }}>
                    <Text className="text-xs font-semibold" style={{ color: status.color }}>
                      {status.label}
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-500">الثقة: {Math.round(item.confidence * 100)}%</Text>
                </View>
              </View>
              <Text className="text-xs text-gray-400 mt-2">التاريخ: {item.date}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PatientHistoryList;
