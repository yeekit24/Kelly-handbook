import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useEffect, useMemo, useState } from "react";

import CategoryScreen from "./screens/CategoryScreen";
import EditCardScreen from "./screens/EditCardScreen";
import HomeScreen from "./screens/HomeScreen";
import ActionMenuScreen from "./screens/ActionMenuScreen";
import ParentPinScreen from "./screens/ParentPinScreen";
import SettingsScreen from "./screens/SettingsScreen";

import { WorkbookState } from "./models/types";
import { loadState, saveState } from "./storage/store";

export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: string };
  ActionMenu: undefined;
  ParentPin: { next: keyof RootStackParamList; params?: any };
  EditCard: { cardId?: string; categoryId: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const WorkbookContext = createContext<{
  state: WorkbookState | null;
  setState: React.Dispatch<React.SetStateAction<WorkbookState | null>>;
}>({ state: null, setState: () => {} });

export default function App() {
  const [state, setState] = useState<WorkbookState | null>(null);

  useEffect(() => {
    loadState().then(setState);
  }, []);

  // auto-save
  useEffect(() => {
    if (!state) return;
    saveState(state);
  }, [state]);

  const ctx = useMemo(() => ({ state, setState }), [state]);

  if (!state) return null;

  return (
    <WorkbookContext.Provider value={ctx}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Kelly Handbook" }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={{ title: "Category" }} />
        <Stack.Screen name="ActionMenu" component={ActionMenuScreen} options={{ title: "Select Menu" }} />
        <Stack.Screen name="ParentPin" component={ParentPinScreen} options={{ title: "Parent Mode" }} />
        <Stack.Screen name="EditCard" component={EditCardScreen} options={{ title: "Edit Card" }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
      </Stack.Navigator>
    </WorkbookContext.Provider>
  );
}
