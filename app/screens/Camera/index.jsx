import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, Alert } from 'react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 justify-center">
        <Text className="text-center pb-2.5">We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          Alert.alert('Photo Taken!', `Photo saved to: ${photo.uri}`);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take picture');
      console.error('Error taking picture:', error);
    }
  }

  return (
    <View className="flex-1 justify-center">
      <CameraView className="flex-1" facing={facing} ref={cameraRef}>
        <View className="flex-1 flex-row bg-transparent m-16">
          <TouchableOpacity className="flex-1 self-end items-center" onPress={toggleCameraFacing}>
            <Text className="text-2xl font-bold text-white">Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <View className="absolute bottom-8 left-0 right-0 flex-row justify-center">
          <TouchableOpacity 
            className="w-16 h-16 bg-white rounded-full items-center justify-center"
            onPress={takePicture}
          >
            <View className="w-12 h-12 bg-white rounded-full border-4 border-gray-300" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
