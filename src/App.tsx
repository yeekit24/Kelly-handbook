import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

import EditCardScreen from "./screens/EditCardScreen";
import HomeScreen, { HomeHeaderRow } from "./screens/HomeScreen";
import ParentPinScreen from "./screens/ParentPinScreen";
import SettingsScreen from "./screens/SettingsScreen";
import EditCategoryScreen from "./screens/EditCategoryScreen";

import { WorkbookState } from "./models/types";
import { loadState, saveState } from "./storage/store";

export type RootStackParamList = {
  Home: undefined;
  ParentPin: { next: keyof RootStackParamList; params?: any };
  EditCard: { cardId?: string; categoryId: string };
  EditCategory: { categoryId?: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const SPEECH_PROMPT_KEY = "AAC_SPEECH_PROMPTED";

export const WorkbookContext = createContext<{
  state: WorkbookState | null;
  setState: React.Dispatch<React.SetStateAction<WorkbookState | null>>;
  sentence: string[];
  setSentence: React.Dispatch<React.SetStateAction<string[]>>;
  language: "EN" | "CH";
  setLanguage: React.Dispatch<React.SetStateAction<"EN" | "CH">>;
}>({
  state: null,
  setState: () => {},
  sentence: [],
  setSentence: () => {},
  language: "EN",
  setLanguage: () => {},
});

export default function App() {
  const [state, setState] = useState<WorkbookState | null>(null);
  const [sentence, setSentence] = useState<string[]>([]);
  const [language, setLanguage] = useState<"EN" | "CH">("EN");

  useEffect(() => {
    loadState().then(setState);
  }, []);

  // auto-save
  useEffect(() => {
    if (!state) return;
    saveState(state);
  }, [state]);

  useEffect(() => {
    if (!state) return;
    const promptSpeech = async () => {
      const prompted = await AsyncStorage.getItem(SPEECH_PROMPT_KEY);
      if (prompted) return;
      const voices = await Speech.getAvailableVoicesAsync();
      if (!voices?.length) {
        Alert.alert(
          "Speech not available",
          "Text-to-speech voices aren't available on this device. Please install a system voice in iOS Settings.",
        );
      } else {
        Alert.alert(
          "Enable speech",
          "If you don't hear speech, check the ringer switch, volume, and Spoken Content settings in iOS.",
        );
      }
      await AsyncStorage.setItem(SPEECH_PROMPT_KEY, "1");
    };
    void promptSpeech();
  }, [state]);

  const ctx = useMemo(
    () => ({ state, setState, sentence, setSentence, language, setLanguage }),
    [state, sentence, language],
  );

  if (!state) return null;

  return (
    <WorkbookContext.Provider value={ctx}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: () => <HomeHeaderRow navigation={navigation} />,
          })}
        />
        <Stack.Screen name="ParentPin" component={ParentPinScreen} options={{ title: "Parent Mode" }} />
        <Stack.Screen name="EditCard" component={EditCardScreen} options={{ title: "Edit Card" }} />
        <Stack.Screen name="EditCategory" component={EditCategoryScreen} options={{ title: "Edit Category" }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
      </Stack.Navigator>
    </WorkbookContext.Provider>
  );
}
