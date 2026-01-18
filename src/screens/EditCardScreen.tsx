import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
  const [labelZh, setLabelZh] = useState(existing?.labelZh ?? "");
  const [speakText, setSpeakText] = useState(existing?.speakText ?? "");
  const [imageUri, setImageUri] = useState(existing?.imageUri ?? "");
  const [language, setLanguage] = useState<"EN" | "CH">(existing?.language ?? "EN");
  const [isGenerating, setIsGenerating] = useState(false);

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return Alert.alert("Permission needed", "Allow photo access to pick images.");

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  const generateImage = async () => {
    const prompt = label.trim() || labelZh.trim();
    if (!prompt) return Alert.alert("Missing word", "Enter a word before generating an image.");
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      return Alert.alert("Missing API key", "Set EXPO_PUBLIC_OPENAI_API_KEY to enable image generation.");
    }

    try {
      setIsGenerating(true);
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt,
          size: "1024x1024",
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to generate image.");
      }

      const payload = await res.json();
      const b64 = payload?.data?.[0]?.b64_json;
      const url = payload?.data?.[0]?.url;
      const fileUri = `${FileSystem.documentDirectory}card_${Date.now()}.png`;

      if (b64) {
        await FileSystem.writeAsStringAsync(fileUri, b64, { encoding: FileSystem.EncodingType.Base64 });
        setImageUri(fileUri);
        return;
      }

      if (url) {
        const result = await FileSystem.downloadAsync(url, fileUri);
        setImageUri(result.uri);
        return;
      }

      throw new Error("No image returned from the API.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to generate image.";
      Alert.alert("Image generation failed", message);
    } finally {
      setIsGenerating(false);
    }
  };

  const save = () => {
    if (!label.trim()) return Alert.alert("Missing English", "Please enter the English word.");
    if (!labelZh.trim()) return Alert.alert("Missing Chinese", "Please enter the Chinese word.");

    setState((prev) => {
      if (!prev) return prev;
      const cards = [...prev.cards];
      if (existing) {
        const idx = cards.findIndex((c) => c.id === existing.id);
        cards[idx] = {
          ...existing,
          label: label.trim(),
          labelZh: labelZh.trim(),
          language,
          speakText: speakText.trim() || undefined,
          imageUri: imageUri || undefined,
        };
      } else {
        const normalizedLabel = label.trim().toLowerCase();
        const existingMatchIndex = cards.findIndex(
          (c) => c.categoryId === categoryId && c.label.toLowerCase() === normalizedLabel && !c.isQuick
        );
        const newCard: AacCard = {
          label: label.trim(),
          labelZh: labelZh.trim(),
          categoryId,
          id: `c_${Date.now()}`,
          language,
          speakText: speakText.trim() || undefined,
          imageUri: imageUri || undefined,
          sortOrder: cards.filter((c) => c.categoryId === categoryId && !c.isQuick).length + 1,
        };
        if (existingMatchIndex >= 0) {
          const existingMatch = cards[existingMatchIndex];
          cards[existingMatchIndex] = {
            ...existingMatch,
            ...newCard,
            id: existingMatch.id,
            sortOrder: existingMatch.sortOrder,
          };
        } else {
          cards.push(newCard);
        }
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

      <View style={styles.imageActions}>
        <Pressable style={styles.secondaryBtn} onPress={pickImage}>
          <Text style={styles.secondaryBtnText}>Upload Photo</Text>
        </Pressable>
        <Pressable style={styles.secondaryBtn} onPress={generateImage} disabled={isGenerating}>
          {isGenerating ? <ActivityIndicator /> : <Text style={styles.secondaryBtnText}>Generate Image</Text>}
        </Pressable>
      </View>

      <Text style={styles.label}>English word</Text>
      <TextInput value={label} onChangeText={setLabel} style={styles.input} placeholder="e.g., Water" />

      <Text style={styles.label}>Chinese word</Text>
      <TextInput value={labelZh} onChangeText={setLabelZh} style={styles.input} placeholder="e.g., 水" />

      <Text style={styles.label}>Language for speech</Text>
      <View style={styles.langRow}>
        {(["EN", "CH"] as const).map((lang) => (
          <Pressable
            key={lang}
            onPress={() => setLanguage(lang)}
            style={[styles.langPill, language === lang && styles.langPillOn]}
          >
            <Text style={styles.langText}>{lang}</Text>
          </Pressable>
        ))}
      </View>

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
  imageActions: { flexDirection: "row", gap: 10 },
  label: { fontSize: 16, fontWeight: "800" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", borderRadius: 12, padding: 12, fontSize: 18 },
  secondaryBtn: { flex: 1, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", padding: 12, borderRadius: 12, alignItems: "center" },
  secondaryBtnText: { fontSize: 14, fontWeight: "800" },
  langRow: { flexDirection: "row", gap: 10 },
  langPill: { flex: 1, padding: 12, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", alignItems: "center" },
  langPillOn: { backgroundColor: "#e6f0ff" },
  langText: { fontWeight: "800", fontSize: 16 },
  btn: { marginTop: 8, backgroundColor: "#e6f0ff", padding: 14, borderRadius: 12, alignItems: "center" },
  btnText: { fontSize: 18, fontWeight: "900" },
});
