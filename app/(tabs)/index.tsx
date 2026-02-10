import { Tasks } from "@/types/task";
import { useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import {
  Appbar,
  Avatar,
  Card,
  Checkbox,
  IconButton,
  Text
} from "react-native-paper";

export default function HomeScreen() {
  const [clearId, setClearId] = useState<number | null>(null);
  const { width: windowWidth } = useWindowDimensions();
  const [cart, setCart] = useState<Tasks[]>([
    {
      id: 1,
      title: "Beras Premium 5kg",
      label: "Beli Beras",
      category: "Sembako",
      description:
        "Beras putih premium kualitas terbaik untuk kebutuhan rumah tangga",
      createdAt: new Date("2026-01-10T08:30:00"),
      updatedAt: new Date("2026-01-10T08:30:00"),
    },
    {
      id: 2,
      title: "Susu UHT Full Cream",
      label: "Beli Susu",
      category: "Minuman",
      description: "Susu UHT full cream 1 liter, kaya kalsium",
      createdAt: new Date("2026-01-11T09:00:00"),
      updatedAt: new Date("2026-01-12T10:15:00"),
    },
    {
      id: 3,
      title: "Mie Instan Goreng",
      label: "Beli Mie",
      category: "Makanan",
      description: "Mie instan rasa goreng favorit keluarga",
      createdAt: new Date("2026-01-12T14:45:00"),
      updatedAt: new Date("2026-01-13T16:20:00"),
    },
  ]);

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Groceries List" />
        <Avatar.Image
          size={30}
          source={{
            uri: "https://i.pinimg.com/736x/9f/5f/e2/9f5fe245bdac1fa10ed3d233d4c50cc0.jpg",
          }}
        ></Avatar.Image>
      </Appbar.Header>

      <View style={{ alignItems: "center", marginTop: 10 }}>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 8 }}
          renderItem={({ item }) => (
            <Card
              style={{
                minWidth: windowWidth,
                marginBottom: 10,
                padding: 5,
                shadowColor: "#000",
                shadowOpacity: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Checkbox status={"unchecked"} onPress={() => {}} />

                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                  <Text style={{ fontSize: 12, color: "#666" }}>
                    {item.category}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{item.description}</Text>
                </View>

                <IconButton
                  icon="pencil"
                  size={20}
                  onPress={() => {
                    console.log("Edit item:", item.id);
                  }}
                />
              </View>
            </Card>
          )}
        />
      </View>
    </View>
  );
}
