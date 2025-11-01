import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import PatientHistoryList from '../components/PatientHistoryList';
import { mockHistory } from '../data/mockData';
import { colors } from '../styles/colors';

const HistoryScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 24 }}>
      <TouchableOpacity className="flex-row items-center mb-4" onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={20} color={colors.primary} />
        <Text className="text-primary font-semibold mr-2">عودة للرئيسية</Text>
      </TouchableOpacity>

      <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
        <Text className="text-lg font-semibold text-gray-900">سجل الفحوصات الكامل</Text>
        <Text className="text-sm text-gray-500 mt-2">
          يتم حفظ جميع نتائج التحليل مع حالة المراجعة ومستوى الثقة لكل مريض.
        </Text>
      </View>

      <PatientHistoryList data={mockHistory} />
    </ScrollView>
  );
};

export default HistoryScreen;
