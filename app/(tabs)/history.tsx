import { Text, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";


export default function TabTwoScreen() {
  return (
   <View >
    <Appbar.Header>
      <Appbar.Content title="Riwayat Selesai" />
      <Avatar.Image size={30} source={{ uri: "https://i.pinimg.com/736x/9f/5f/e2/9f5fe245bdac1fa10ed3d233d4c50cc0.jpg"}}></Avatar.Image>
    </Appbar.Header>
    <View>
      <Text>
        Page Riwayat disini
      </Text>
    </View>
   </View>
  );
}


