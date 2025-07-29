// app/screens/Home/index.js
import { View, Text, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-red-200">
      <Text className="text-2xl font-bold mb-4">Home Page</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        <Text className="text-white">Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
