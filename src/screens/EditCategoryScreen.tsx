import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useMemo, useState } from "react";
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList, WorkbookContext } from "../App";
import { Category } from "../models/types";

type Props = NativeStackScreenProps<RootStackParamList, "EditCategory">;

export default function EditCategoryScreen({ route, navigation }: Props) {
  const { state, setState } = useContext(WorkbookContext);
  const { categoryId } = route.params ?? {};
  const [mode, setMode] = useState<"menu" | "categoryForm" | "itemSelect">("menu");

  const existing = useMemo(
    () => state!.categories.find((c) => c.id === categoryId),
    [state, categoryId]
  );

  const [name, setName] = useState(existing?.name ?? "");
  const [nameZh, setNameZh] = useState(existing?.nameZh ?? "");
  const [imageUri, setImageUri] = useState(existing?.imageUri ?? "");

  const categories = [...state!.categories].sort((a, b) => a.sortOrder - b.sortOrder);

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return Alert.alert("Permission needed", "Allow photo access to pick images.");

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  const save = () => {
    if (!name.trim()) return Alert.alert("Missing English", "Please enter the English word.");
    if (!nameZh.trim()) return Alert.alert("Missing Chinese", "Please enter the Chinese word.");

    setState((prev) => {
      if (!prev) return prev;
      const categories = [...prev.categories];
      const normalized = name.trim().toLowerCase();
      const newCategory: Category = {
        id: existing?.id ?? `cat_${Date.now()}`,
        name: name.trim(),
        nameZh: nameZh.trim(),
        imageUri: imageUri || undefined,
        emoji: existing?.emoji,
        color: existing?.color,
        sortOrder: existing?.sortOrder ?? categories.length + 1,
      };

      if (existing) {
        const idx = categories.findIndex((c) => c.id === existing.id);
        categories[idx] = newCategory;
      } else {
        const existingMatchIndex = categories.findIndex((c) => c.name.toLowerCase() === normalized);
        if (existingMatchIndex >= 0) {
          categories[existingMatchIndex] = { ...categories[existingMatchIndex], ...newCategory };
        } else {
          categories.push(newCategory);
        }
      }

      return { ...prev, categories };
    });

    navigation.goBack();
  };

  if (mode === "itemSelect") {
    return (
      <View style={styles.container}>
        <View style={styles.menuRow}>
          <Text style={styles.title}>Choose a category</Text>
          <Pressable style={styles.linkBtn} onPress={() => setMode("menu")}>
            <Text style={styles.linkText}>Back</Text>
          </Pressable>
        </View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <Pressable
              style={styles.row}
              onPress={() => navigation.navigate("EditCard", { categoryId: item.id })}
            >
              {item.imageUri ? (
                <Image source={{ uri: item.imageUri }} style={styles.rowImage} />
              ) : (
                <View style={styles.rowPlaceholder}>
                  <Text style={styles.rowPlaceholderText}>{item.emoji ?? "📘"}</Text>
                </View>
              )}
              <View style={styles.rowLabelWrap}>
                <Text style={styles.rowLabel}>{item.name}</Text>
                {item.nameZh ? <Text style={styles.rowSubLabel}>{item.nameZh}</Text> : null}
              </View>
            </Pressable>
          )}
        />
      </View>
    );
  }

  if (mode === "menu") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What would you like to add?</Text>
        <Pressable style={styles.btn} onPress={() => setMode("categoryForm")}>
          <Text style={styles.btnText}>Add Category</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => setMode("itemSelect")}>
          <Text style={styles.btnText}>Add Category Item</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuRow}>
        <Text style={styles.title}>Add Category</Text>
        <Pressable style={styles.linkBtn} onPress={() => setMode("menu")}>
          <Text style={styles.linkText}>Back</Text>
        </Pressable>
      </View>

      <Pressable style={styles.imgBox} onPress={pickImage}>
        {imageUri ? <Image source={{ uri: imageUri }} style={styles.img} /> : <Text style={styles.imgHint}>Tap to add image</Text>}
      </Pressable>

      <Text style={styles.label}>English word</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="e.g., Food" />

      <Text style={styles.label}>Chinese word</Text>
      <TextInput value={nameZh} onChangeText={setNameZh} style={styles.input} placeholder="e.g., 食物" />

      <Pressable style={styles.btn} onPress={save}>
        <Text style={styles.btnText}>Save Category</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa", padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: "900", color: "#222" },
  menuRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  linkBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee" },
  linkText: { fontWeight: "800" },
  imgBox: { height: 160, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", alignItems: "center", justifyContent: "center" },
  img: { width: "100%", height: "100%", borderRadius: 16 },
  imgHint: { fontSize: 16, fontWeight: "800", color: "#666" },
  label: { fontSize: 16, fontWeight: "800" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", borderRadius: 12, padding: 12, fontSize: 18 },
  btn: { marginTop: 8, backgroundColor: "#e6f0ff", padding: 14, borderRadius: 12, alignItems: "center" },
  btnText: { fontSize: 18, fontWeight: "900" },
  row: {
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
  },
  rowImage: { width: 48, height: 48, borderRadius: 10 },
  rowPlaceholder: { width: 48, height: 48, borderRadius: 10, backgroundColor: "#f1f1f1", alignItems: "center", justifyContent: "center" },
  rowPlaceholderText: { fontSize: 22 },
  rowLabelWrap: { flex: 1, gap: 2 },
  rowLabel: { fontSize: 18, fontWeight: "800" },
  rowSubLabel: { fontSize: 16, fontWeight: "600", color: "#555" },
});
