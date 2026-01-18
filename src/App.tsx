import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useEffect, useMemo, useState } from "react";

import EditCardScreen from "./screens/EditCardScreen";
import HomeScreen from "./screens/HomeScreen";
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

export const WorkbookContext = createContext<{
  state: WorkbookState | null;
  setState: React.Dispatch<React.SetStateAction<WorkbookState | null>>;
  sentence: string[];
  setSentence: React.Dispatch<React.SetStateAction<string[]>>;
}>({ state: null, setState: () => {}, sentence: [], setSentence: () => {} });

export default function App() {
  const [state, setState] = useState<WorkbookState | null>(null);
  const [sentence, setSentence] = useState<string[]>([]);

  useEffect(() => {
    loadState().then(setState);
  }, []);

  // auto-save
  useEffect(() => {
    if (!state) return;
    saveState(state);
  }, [state]);

  const ctx = useMemo(() => ({ state, setState, sentence, setSentence }), [state, sentence]);

  if (!state) return null;

  return (
    <WorkbookContext.Provider value={ctx}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Kelly Handbook" }} />
        <Stack.Screen name="ParentPin" component={ParentPinScreen} options={{ title: "Parent Mode" }} />
        <Stack.Screen name="EditCard" component={EditCardScreen} options={{ title: "Edit Card" }} />
        <Stack.Screen name="EditCategory" component={EditCategoryScreen} options={{ title: "Edit Category" }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
      </Stack.Navigator>
    </WorkbookContext.Provider>
  );
}
