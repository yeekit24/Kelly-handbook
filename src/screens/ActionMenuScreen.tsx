import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList, WorkbookContext } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "ActionMenu">;

export default function ActionMenuScreen({ navigation }: Props) {
  const { state } = useContext(WorkbookContext);
  if (!state) return null;

  const categories = [...state.categories].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a menu</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.row, { backgroundColor: item.color ?? "#fff" }]}
            onPress={() => navigation.navigate("EditCard", { categoryId: item.id })}
          >
            <Text style={styles.rowEmoji}>{item.emoji ?? "📘"}</Text>
            <Text style={styles.rowLabel}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa", padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: "800", color: "#222" },
  row: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowEmoji: { fontSize: 22 },
  rowLabel: { fontSize: 18, fontWeight: "800" },
});
