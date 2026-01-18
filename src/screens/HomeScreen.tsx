import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Speech from "expo-speech";
import React, { useContext, useMemo, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { RootStackParamList, WorkbookContext } from "../App";
import CardTile from "../UI/CardTile";
import SentenceBar from "../UI/SentenceBar";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
type HomeNavigation = Props["navigation"];

export function HomeHeaderRow({ navigation }: { navigation: HomeNavigation }) {
  const { language, setLanguage } = useContext(WorkbookContext);

  return (
    <View style={styles.headerRow}>
      <View style={styles.titleWrap}>
        <Image source={require("../../assets/images/icon.png")} style={styles.appIconImage} />
        <Text style={styles.titleText}>Kelly Handbook</Text>
      </View>
      <View style={styles.headerActions}>
        <Pressable
          onPress={() => navigation.navigate("ParentPin", { next: "EditCategory" })}
          style={styles.addCategoryButton}
        >
          <Text style={styles.addCategoryText}>＋ Category</Text>
        </Pressable>
        <Pressable onPress={() => setLanguage((current) => (current === "EN" ? "CH" : "EN"))} style={styles.langToggle}>
          <Text style={styles.langText}>{language}</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ParentPin", { next: "Settings" })} style={styles.moreButton}>
          <Text style={styles.moreText}>⋯</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function HomeScreen({}: Props) {
  const { state, sentence, setSentence, language } = useContext(WorkbookContext);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  if (!state) return null;

  const categories = [...state.categories].sort((a, b) => a.sortOrder - b.sortOrder);
  const activeCategoryId = selectedCategoryId ?? categories[0]?.id ?? "";
  const isTablet = width >= 768;

  const cards = useMemo(() => {
    return state.cards
      .filter((c) => !c.isQuick && c.categoryId === activeCategoryId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [state, activeCategoryId]);

  const speak = (text: string, lang?: "EN" | "CH") => {
    Speech.stop();
    Speech.speak(text, {
      rate: state.settings.rate,
      voice: lang === "CH" ? undefined : state.settings.voice,
      language: lang === "CH" ? "zh-CN" : undefined,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        <SentenceBar
          words={sentence}
          onSpeak={() => speak(sentence.join(" "), language)}
          onClear={() => setSentence([])}
          onBackspace={() => setSentence((prev) => prev.slice(0, -1))}
        />
      </View>

      <View style={[styles.body, isTablet && styles.bodyTablet]}>
        {isTablet ? (
          <View style={styles.drawer}>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.categoryList, styles.categoryListTablet]}
              renderItem={({ item }) => {
                const isActive = item.id === activeCategoryId;
                return (
                  <Pressable
                    onPress={() => setSelectedCategoryId(item.id)}
                    style={[
                      styles.categoryPill,
                      isActive && styles.categoryPillActive,
                      styles.categoryPillTablet,
                    ]}
                  >
                    {item.imageUri ? (
                      <Image source={{ uri: item.imageUri }} style={styles.categoryImage} />
                    ) : (
                      <Text style={styles.categoryEmoji}>{item.emoji ?? "📘"}</Text>
                    )}
                    <View style={styles.categoryTextWrap}>
                      <Text style={styles.categoryText}>{item.name}</Text>
                      {item.nameZh ? <Text style={styles.categorySubText}>{item.nameZh}</Text> : null}
                    </View>
                  </Pressable>
                );
              }}
            />
          </View>
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => {
              const isActive = item.id === activeCategoryId;
              return (
                <Pressable
                  onPress={() => setSelectedCategoryId(item.id)}
                  style={[styles.categoryPill, styles.categoryPillPhone, isActive && styles.categoryPillActive]}
                >
                  {item.imageUri ? (
                    <Image source={{ uri: item.imageUri }} style={styles.categoryImagePhone} />
                  ) : (
                    <Text style={styles.categoryEmojiPhone}>{item.emoji ?? "📘"}</Text>
                  )}
                  <View style={styles.categoryTextWrapPhone}>
                    <Text style={styles.categoryTextPhone}>{item.name}</Text>
                    {item.nameZh ? <Text style={styles.categorySubTextPhone}>{item.nameZh}</Text> : null}
                  </View>
                </Pressable>
              );
            }}
          />
        )}

        <FlatList
          data={cards}
          key={`${activeCategoryId}-${state.settings.gridColumns}`}
          numColumns={state.settings.gridColumns}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cardsGrid}
          columnWrapperStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <CardTile
              label={item.label}
              secondaryLabel={item.labelZh}
              imageUri={item.imageUri}
              onPress={() => {
                const displayLabel = item.language === "CH" ? item.labelZh ?? item.label : item.label;
                const fallbackSpeak = item.language === "CH" ? item.labelZh ?? item.label : item.label;
                setSentence((prev) => [...prev, displayLabel]);
                if (state.settings.speakOnTap) speak(item.speakText ?? fallbackSpeak, item.language ?? "EN");
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  headerBlock: { gap: 12, paddingBottom: 10 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, gap: 12 },
  titleWrap: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  appIconImage: { width: 36, height: 36, borderRadius: 10 },
  titleText: { fontSize: 18, fontWeight: "900", color: "#222" },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  addCategoryButton: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee" },
  addCategoryText: { fontWeight: "800" },
  langToggle: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee" },
  langText: { fontWeight: "800" },
  moreButton: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee" },
  moreText: { fontSize: 22, fontWeight: "800", marginTop: -4 },
  body: { flex: 1, gap: 12, paddingHorizontal: 12 },
  bodyTablet: { flexDirection: "row", gap: 16 },
  categoryList: { gap: 8, paddingBottom: 4 },
  categoryListTablet: { paddingVertical: 8, gap: 8 },
  drawer: {
    width: 210,
    maxHeight: "92%",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 8,
  },
  categoryPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  categoryPillPhone: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    minWidth: 120,
    justifyContent: "center",
    flexDirection: "column",
    gap: 6,
  },
  categoryPillActive: { backgroundColor: "#e6f0ff", borderColor: "#c7dcff" },
  categoryPillTablet: { paddingVertical: 6, justifyContent: "flex-start" },
  categoryEmoji: { fontSize: 18 },
  categoryImage: { width: 22, height: 22, borderRadius: 6 },
  categoryTextWrap: { gap: 1 },
  categoryText: { fontSize: 14, fontWeight: "800" },
  categorySubText: { fontSize: 12, fontWeight: "600", color: "#555" },
  categoryEmojiPhone: { fontSize: 24 },
  categoryImagePhone: { width: 48, height: 48, borderRadius: 10 },
  categoryTextWrapPhone: { gap: 2, alignItems: "center" },
  categoryTextPhone: { fontSize: 16, fontWeight: "800", textAlign: "center" },
  categorySubTextPhone: { fontSize: 14, fontWeight: "600", color: "#555", textAlign: "center" },
  cardsGrid: { gap: 12, paddingBottom: 16, flexGrow: 1 },
});
