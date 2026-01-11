import AsyncStorage from "@react-native-async-storage/async-storage";
import { WorkbookState } from "../models/types";
import { SEED } from "../data/seed";

const KEY = "AAC_WORKBOOK_V1";

export async function loadState(): Promise<WorkbookState> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return SEED;
  try {
    return JSON.parse(raw) as WorkbookState;
  } catch {
    return SEED;
  }
}

export async function saveState(state: WorkbookState) {
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}
