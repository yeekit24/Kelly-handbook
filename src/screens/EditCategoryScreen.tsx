import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList, WorkbookContext } from "../App";
import { Category } from "../models/types";

type Props = NativeStackScreenProps<RootStackParamList, "EditCategory">;

export default function EditCategoryScreen({ route, navigation }: Props) {
  const { state, setState } = useContext(WorkbookContext);
  const { categoryId } = route.params ?? {};

  const existing = useMemo(
    () => state!.categories.find((c) => c.id === categoryId),
    [state, categoryId]
  );

  const [name, setName] = useState(existing?.name ?? "");
  const [emoji, setEmoji] = useState(existing?.emoji ?? "");
  const [color, setColor] = useState(existing?.color ?? "");

  const save = () => {
    if (!name.trim()) return Alert.alert("Missing name", "Please enter the category name.");

    setState((prev) => {
      if (!prev) return prev;
      const categories = [...prev.categories];
      const normalized = name.trim().toLowerCase();
      const newCategory: Category = {
        id: existing?.id ?? `cat_${Date.now()}`,
        name: name.trim(),
        emoji: emoji.trim() || undefined,
        color: color.trim() || undefined,
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="e.g., Food" />

      <Text style={styles.label}>Emoji (optional)</Text>
      <TextInput value={emoji} onChangeText={setEmoji} style={styles.input} placeholder="e.g., 🍎" />

      <Text style={styles.label}>Color (optional hex)</Text>
      <TextInput value={color} onChangeText={setColor} style={styles.input} placeholder="#E7F0FF" />

      <Pressable style={styles.btn} onPress={save}>
        <Text style={styles.btnText}>Save Category</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa", padding: 16, gap: 12 },
  label: { fontSize: 16, fontWeight: "800" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", borderRadius: 12, padding: 12, fontSize: 18 },
  btn: { marginTop: 8, backgroundColor: "#e6f0ff", padding: 14, borderRadius: 12, alignItems: "center" },
  btnText: { fontSize: 18, fontWeight: "900" },
});
