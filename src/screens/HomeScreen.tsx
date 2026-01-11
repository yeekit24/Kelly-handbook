import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList, WorkbookContext } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { state } = useContext(WorkbookContext);
  if (!state) return null;

  const categories = [...state.categories].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ padding: 12, gap: 12 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("Category", { categoryId: item.id })}
            style={[styles.tile, { backgroundColor: item.color ?? "#fff" }]}
          >
            <Text style={styles.emoji}>{item.emoji ?? "📘"}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </Pressable>
        )}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <Pressable onPress={() => navigation.navigate("Settings")} style={styles.headerBtn}>
              <Text style={styles.headerBtnText}>Settings</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                navigation.navigate("ParentPin", { next: "Settings" })
              }
              style={styles.headerBtn}
            >
              <Text style={styles.headerBtnText}>Parent</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  headerRow: { flexDirection: "row", gap: 10, paddingBottom: 10 },
  headerBtn: { flex: 1, padding: 12, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee" },
  headerBtnText: { fontWeight: "800", textAlign: "center" },
  tile: { flex: 1, minHeight: 140, borderRadius: 18, padding: 14, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#eee" },
  emoji: { fontSize: 34, marginBottom: 8 },
  name: { fontSize: 20, fontWeight: "900" },
});
