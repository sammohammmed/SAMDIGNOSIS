import React, { useCallback, useState } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import FileUploadCard from '../components/FileUploadCard';
import PatientHistoryList from '../components/PatientHistoryList';
import { mockHistory } from '../data/mockData';
import { RootStackParamList } from '../navigation';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePickFile = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
        type: ['image/*', 'application/dicom', 'text/csv', 'application/vnd.ms-excel', 'application/pdf'],
      });

      if (result.type === 'success') {
        setSelectedFile(result);
      }
    } catch (error) {
      Alert.alert('تعذّر اختيار الملف', 'يرجى المحاولة مجددًا.');
    }
  }, []);

  const handleAnalyze = useCallback(() => {
    if (!selectedFile) {
      Alert.alert('لم يتم اختيار ملف', 'يرجى اختيار ملف طبي لتحليله.');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      navigation.navigate('Analysis', {
        fileName: selectedFile.name,
        fileUri: selectedFile.uri ?? '',
      });
    }, 1200);
  }, [navigation, selectedFile]);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 24 }}>
      <Header onHistoryPress={() => navigation.navigate('History')} />

      <FileUploadCard
        fileName={selectedFile?.name}
        onPickFile={handlePickFile}
        onAnalyze={handleAnalyze}
        onReset={handleReset}
        isAnalyzing={isAnalyzing}
      />

      <View className="mt-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">أحدث الفحوصات</Text>
        <PatientHistoryList data={mockHistory.slice(0, 3)} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
