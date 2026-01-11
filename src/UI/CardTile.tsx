import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function CardTile(props: {
  label: string;
  imageUri?: string;
  onPress: () => void;
  onLongPress?: () => void;
}) {
  return (
    <Pressable onPress={props.onPress} onLongPress={props.onLongPress} style={styles.tile}>
      {props.imageUri ? (
        <Image source={{ uri: props.imageUri }} style={styles.img} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>🖼️</Text>
        </View>
      )}
      <Text style={styles.label} numberOfLines={2}>{props.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minHeight: 120,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  img: { width: 72, height: 72, borderRadius: 12 },
  placeholder: {
    width: 72, height: 72, borderRadius: 12,
    backgroundColor: "#f1f1f1", alignItems: "center", justifyContent: "center"
  },
  placeholderText: { fontSize: 28 },
  label: { fontSize: 18, fontWeight: "700", textAlign: "center" },
});
