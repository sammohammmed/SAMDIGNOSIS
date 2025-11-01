import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

type HeaderProps = {
  onHistoryPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({ onHistoryPress }) => {
  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      className="rounded-3xl p-6 mb-6 shadow-lg"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-4">
          <Text className="text-white text-2xl font-semibold">SAMDIAGNOSIS</Text>
          <Text className="text-white/80 text-sm mt-2">
            منصة ذكية لتحليل الصور الطبية ونتائج المختبرات باستخدام الذكاء الاصطناعي.
          </Text>
        </View>
        {onHistoryPress ? (
          <TouchableOpacity
            onPress={onHistoryPress}
            className="bg-white/15 border border-white/20 rounded-full px-4 py-2"
          >
            <View className="flex-row items-center">
              <MaterialIcons name="history" size={18} color="#FFFFFF" />
              <Text className="text-white text-sm ml-2">سجل المرضى</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </LinearGradient>
  );
};

export default Header;
