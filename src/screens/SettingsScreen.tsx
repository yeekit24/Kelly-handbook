import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { WorkbookContext } from "../App";

export default function SettingsScreen() {
  const { state, setState } = useContext(WorkbookContext);
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
      <Pressable onPress={toggleSpeak} style={[styles.pill, styles.full]}>
        <Text style={styles.pillText}>{s.speakOnTap ? "ON" : "OFF"}</Text>
      </Pressable>

      <Text style={styles.h}>Speech rate</Text>
      <View style={styles.row}>
        <Pressable onPress={() => adjustRate(-0.1)} style={styles.pill}><Text style={styles.pillText}>-</Text></Pressable>
        <View style={[styles.pill, styles.full]}><Text style={styles.pillText}>{s.rate.toFixed(2)}</Text></View>
        <Pressable onPress={() => adjustRate(0.1)} style={styles.pill}><Text style={styles.pillText}>+</Text></Pressable>
      </View>
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
});
