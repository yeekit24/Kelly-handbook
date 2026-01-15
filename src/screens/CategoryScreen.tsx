import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Speech from "expo-speech";
import React, { useContext, useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList, WorkbookContext } from "../App";
import CardTile from "../UI/CardTile";
import SentenceBar from "../UI/SentenceBar";

type Props = NativeStackScreenProps<RootStackParamList, "Category">;

export default function CategoryScreen({ route, navigation }: Props) {
  const { state, sentence, setSentence } = useContext(WorkbookContext);
  const categoryId = route.params.categoryId;

  const category = state!.categories.find((c) => c.id === categoryId);
  const settings = state!.settings;

  const cards = useMemo(() => {
    return state!.cards
      .filter((c) => !c.isQuick && c.categoryId === categoryId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [state, categoryId]);

  React.useEffect(() => {
    navigation.setOptions({ title: category?.name ?? "Category" });
  }, [category?.name]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("ParentPin", { next: "EditCard", params: { categoryId } })}
          style={styles.addActionButton}
        >
          <Text style={styles.addActionText}>Add Action</Text>
        </Pressable>
      ),
    });
  }, [navigation, categoryId]);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { rate: settings.rate, voice: settings.voice });
  };

  const onTapCard = (label: string, speakText?: string) => {
    const next = [...sentence, label];
    setSentence(next);
    if (settings.speakOnTap) speak(speakText ?? label);
  };

  return (
    <View style={styles.container}>
      <SentenceBar
        words={sentence}
        onSpeak={() => speak(sentence.join(" "))}
        onClear={() => setSentence([])}
        onBackspace={() => setSentence((prev) => prev.slice(0, -1))}
      />

      <FlatList
        data={cards}
        key={settings.gridColumns} // re-layout when columns change
        numColumns={settings.gridColumns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <CardTile
            label={item.label}
            secondaryLabel={item.labelZh}
            imageUri={item.imageUri}
            onPress={() => {
              const displayLabel = item.language === "CH" ? item.labelZh ?? item.label : item.label;
              const fallbackSpeak = item.language === "CH" ? item.labelZh ?? item.label : item.label;
              onTapCard(displayLabel, item.speakText ?? fallbackSpeak);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  addActionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  addActionText: { fontWeight: "800", fontSize: 14 },
});
