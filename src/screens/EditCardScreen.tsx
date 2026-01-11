import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useMemo, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList, WorkbookContext } from "../App";
import { AacCard } from "../models/types";

type Props = NativeStackScreenProps<RootStackParamList, "EditCard">;

export default function EditCardScreen({ route, navigation }: Props) {
  const { state, setState } = useContext(WorkbookContext);
  const { cardId, categoryId } = route.params;

  const existing = useMemo(
    () => state!.cards.find((c) => c.id === cardId),
    [state, cardId]
  );

  const [label, setLabel] = useState(existing?.label ?? "");
  const [speakText, setSpeakText] = useState(existing?.speakText ?? "");
  const [imageUri, setImageUri] = useState(existing?.imageUri ?? "");

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
    if (!label.trim()) return Alert.alert("Missing label", "Please enter a label.");

    setState((prev) => {
      if (!prev) return prev;
      const cards = [...prev.cards];
      if (existing) {
        const idx = cards.findIndex((c) => c.id === existing.id);
        cards[idx] = { ...existing, label: label.trim(), speakText: speakText.trim() || undefined, imageUri: imageUri || undefined };
      } else {
        const newCard: AacCard = {
          id: `c_${Date.now()}`,
          categoryId,
          label: label.trim(),
          speakText: speakText.trim() || undefined,
          imageUri: imageUri || undefined,
          sortOrder: cards.filter((c) => c.categoryId === categoryId && !c.isQuick).length + 1,
        };
        cards.push(newCard);
      }
      return { ...prev, cards };
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.imgBox} onPress={pickImage}>
        {imageUri ? <Image source={{ uri: imageUri }} style={styles.img} /> : <Text style={styles.imgHint}>Tap to pick image</Text>}
      </Pressable>

      <Text style={styles.label}>Label (big text)</Text>
      <TextInput value={label} onChangeText={setLabel} style={styles.input} placeholder="e.g., Water" />

      <Text style={styles.label}>Speak text (optional)</Text>
      <TextInput value={speakText} onChangeText={setSpeakText} style={styles.input} placeholder="Leave empty to speak the label" />

      <Pressable style={styles.btn} onPress={save}>
        <Text style={styles.btnText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa", padding: 16, gap: 12 },
  imgBox: { height: 180, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", alignItems: "center", justifyContent: "center" },
  img: { width: "100%", height: "100%", borderRadius: 16 },
  imgHint: { fontSize: 18, fontWeight: "800", color: "#666" },
  label: { fontSize: 16, fontWeight: "800" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", borderRadius: 12, padding: 12, fontSize: 18 },
  btn: { marginTop: 8, backgroundColor: "#e6f0ff", padding: 14, borderRadius: 12, alignItems: "center" },
  btnText: { fontSize: 18, fontWeight: "900" },
});
