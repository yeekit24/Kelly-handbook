import React, { useContext, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { WorkbookContext } from "../App";
import { SEED } from "../data/seed";

export default function SettingsScreen() {
  const { state, setState } = useContext(WorkbookContext);
  const [importJson, setImportJson] = useState("");
  const s = state!.settings;

  const setColumns = (n: 2 | 3 | 4) =>
    setState((prev) => (prev ? { ...prev, settings: { ...prev.settings, gridColumns: n } } : prev));

  const toggleSpeak = () =>
    setState((prev) => (prev ? { ...prev, settings: { ...prev.settings, speakOnTap: !prev.settings.speakOnTap } } : prev));

  const adjustRate = (delta: number) =>
    setState((prev) => {
      if (!prev) return prev;
      const next = Math.min(2, Math.max(0.1, prev.settings.rate + delta));
      return { ...prev, settings: { ...prev.settings, rate: next } };
    });

  const importData = () => {
    try {
      const parsed = JSON.parse(importJson);
      if (!parsed?.categories || !parsed?.cards || !parsed?.settings) {
        throw new Error("Invalid data file.");
      }
      const sanitizeImageUri = (uri?: string) => {
        if (!uri) return undefined;
        return uri.startsWith("file://") ? undefined : uri;
      };

      const sanitized = {
        ...parsed,
        categories: parsed.categories.map((category: any) => ({
          ...category,
          imageUri: sanitizeImageUri(category.imageUri),
        })),
        cards: parsed.cards.map((card: any) => ({
          ...card,
          imageUri: sanitizeImageUri(card.imageUri),
        })),
      };

      setState(sanitized);
      Alert.alert("Import complete", "Your data has been loaded on this device. Local images were cleared.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to import data.";
      Alert.alert("Import failed", message);
    }
  };

  const resetToSeed = () => {
    Alert.alert("Reset data?", "This will replace all current data with the original seed data.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => {
          setState(SEED);
          Alert.alert("Reset complete", "Seed data has been restored.");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h}>Grid Columns</Text>
      <View style={styles.row}>
        {[2, 3, 4].map((n) => (
          <Pressable key={n} onPress={() => setColumns(n as any)} style={[styles.pill, s.gridColumns === n && styles.pillOn]}>
            <Text style={styles.pillText}>{n}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.h}>Speak on tap</Text>
      <Pressable onPress={toggleSpeak} style={[styles.pill, styles.compactPill]}>
        <Text style={styles.pillText}>{s.speakOnTap ? "ON" : "OFF"}</Text>
      </Pressable>

      <Text style={styles.h}>Speech rate</Text>
      <View style={styles.row}>
        <Pressable onPress={() => adjustRate(-0.1)} style={styles.pill}><Text style={styles.pillText}>-</Text></Pressable>
        <View style={[styles.pill, styles.full]}><Text style={styles.pillText}>{s.rate.toFixed(2)}</Text></View>
        <Pressable onPress={() => adjustRate(0.1)} style={styles.pill}><Text style={styles.pillText}>+</Text></Pressable>
      </View>

      <Text style={styles.h}>Data Transfer</Text>
      <TextInput
        value={importJson}
        onChangeText={setImportJson}
        style={styles.textArea}
        multiline
        placeholder="Paste JSON here to import data."
      />
      <Pressable onPress={importData} style={[styles.pill, styles.full]}>
        <Text style={styles.pillText}>Import Data</Text>
      </Pressable>
      <Pressable onPress={resetToSeed} style={[styles.pill, styles.full]}>
        <Text style={styles.pillText}>Reset to Seed Data</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fafafa", gap: 12 },
  h: { fontSize: 18, fontWeight: "900" },
  row: { flexDirection: "row", gap: 10 },
  pill: { padding: 14, borderRadius: 14, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", alignItems: "center", justifyContent: "center", minWidth: 64 },
  pillOn: { backgroundColor: "#e6f0ff" },
  pillText: { fontSize: 18, fontWeight: "900" },
  full: { flex: 1 },
  compactPill: { alignSelf: "flex-start", paddingVertical: 8, paddingHorizontal: 16, minWidth: 72 },
  textArea: {
    minHeight: 120,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    padding: 12,
    fontSize: 14,
  },
});
