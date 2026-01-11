import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SentenceBar(props: {
  words: string[];
  onSpeak: () => void;
  onClear: () => void;
  onBackspace: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <ScrollView horizontal contentContainerStyle={styles.words}>
        {props.words.length === 0 ? (
          <Text style={styles.hint}>Tap cards to build a sentence…</Text>
        ) : (
          props.words.map((w, idx) => (
            <View key={`${w}-${idx}`} style={styles.chip}>
              <Text style={styles.chipText}>{w}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.actions}>
        <Pressable style={styles.btn} onPress={props.onBackspace}><Text style={styles.btnText}>⌫</Text></Pressable>
        <Pressable style={styles.btn} onPress={props.onClear}><Text style={styles.btnText}>Clear</Text></Pressable>
        <Pressable style={[styles.btn, styles.speak]} onPress={props.onSpeak}><Text style={styles.btnText}>Speak</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#fff", borderBottomWidth: 1, borderColor: "#eee", padding: 10, gap: 10 },
  words: { alignItems: "center", gap: 8, paddingHorizontal: 4 },
  hint: { color: "#666", fontSize: 16 },
  chip: { backgroundColor: "#f4f4f4", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  chipText: { fontSize: 16, fontWeight: "700" },
  actions: { flexDirection: "row", gap: 8 },
  btn: { flex: 1, backgroundColor: "#f3f3f3", padding: 12, borderRadius: 12, alignItems: "center" },
  speak: { backgroundColor: "#e6f0ff" },
  btnText: { fontSize: 16, fontWeight: "800" },
});
