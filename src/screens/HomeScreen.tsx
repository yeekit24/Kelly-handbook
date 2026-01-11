import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Switch, Text, View } from "react-native";
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
              <View style={styles.langToggle}>
                <Text style={[styles.langText, language === "EN" && styles.langTextActive]}>EN</Text>
                <Switch
                  value={language === "CH"}
                  onValueChange={(value) => setLanguage(value ? "CH" : "EN")}
                />
                <Text style={[styles.langText, language === "CH" && styles.langTextActive]}>CH</Text>
              </View>
              <Pressable
                onPress={() => navigation.navigate("ParentPin", { next: "Settings" })}
                style={styles.moreButton}
              >
                <AntDesign name="more" size={24} color="black" />
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
  langToggle: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee" },
  langText: { fontWeight: "700", color: "#666" },
  langTextActive: { color: "#111", fontWeight: "900" },
  moreButton: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee" },
  tile: { flex: 1, minHeight: 140, borderRadius: 18, padding: 14, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#eee" },
  emoji: { fontSize: 34, marginBottom: 8 },
  name: { fontSize: 20, fontWeight: "900" },
});
