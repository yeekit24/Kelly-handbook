import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList, WorkbookContext } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { state } = useContext(WorkbookContext);
  const [language, setLanguage] = useState<"EN" | "CH">("EN");
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
            <View style={styles.titleWrap}>
              <Image source={require("../../assets/images/icon.png")} style={styles.appIcon} />
              <Text style={styles.titleText}>Kelly Handbook</Text>
            </View>
            <View style={styles.headerActions}>
              <Pressable
                onPress={() => setLanguage((current) => (current === "EN" ? "CH" : "EN"))}
                style={styles.langToggle}
              >
                <Text style={styles.langText}>{language}</Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("ParentPin", { next: "Settings" })}
                style={styles.moreButton}
              >
                <Text style={styles.moreText}>⋯</Text>
              </Pressable>
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, gap: 12 },
  titleWrap: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  appIcon: { width: 36, height: 36, borderRadius: 10 },
  titleText: { fontSize: 22, fontWeight: "900", color: "#222" },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  langToggle: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee" },
  langText: { fontWeight: "800" },
  moreButton: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee" },
  moreText: { fontSize: 22, fontWeight: "800", marginTop: -4 },
  tile: { flex: 1, minHeight: 140, borderRadius: 18, padding: 14, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#eee" },
  emoji: { fontSize: 34, marginBottom: 8 },
  name: { fontSize: 20, fontWeight: "900" },
});
