import { WorkbookState } from "../models/types";

export const SEED: WorkbookState = {
  categories: [
    { id: "people", name: "People", nameZh: "人", emoji: "👨‍👩‍👧", color: "#E7F0FF", sortOrder: 1 },
    { id: "food", name: "Food", nameZh: "食物", emoji: "🍎", color: "#FFF3E6", sortOrder: 2 },
    { id: "drinks", name: "Drinks", nameZh: "饮料", emoji: "🧃", color: "#EAFBF1", sortOrder: 3 },
    { id: "feelings", name: "Feelings", nameZh: "感觉", emoji: "🙂", color: "#F3E8FF", sortOrder: 4 },
    { id: "actions", name: "Actions", nameZh: "动作", emoji: "🏃", color: "#EFFFF8", sortOrder: 5 },
    { id: "help", name: "Help", nameZh: "帮助", emoji: "🆘", color: "#FFECEC", sortOrder: 6 },
  ],
  cards: [
    // Quick
    { id: "q_yes", categoryId: "help", label: "Yes", isQuick: true, sortOrder: 1, language: "EN" },
    { id: "q_no", categoryId: "help", label: "No", isQuick: true, sortOrder: 2, language: "EN" },
    { id: "q_more", categoryId: "help", label: "More", isQuick: true, sortOrder: 3, language: "EN" },
    { id: "q_help", categoryId: "help", label: "Help", isQuick: true, sortOrder: 4, language: "EN" },
    { id: "q_stop", categoryId: "help", label: "Stop", isQuick: true, sortOrder: 5, language: "EN" },

    // Food
    { id: "f_apple", categoryId: "food", label: "Apple", sortOrder: 1, language: "EN" },
    { id: "f_rice", categoryId: "food", label: "Rice", sortOrder: 2, language: "EN" },
    { id: "f_snack", categoryId: "food", label: "Snack", sortOrder: 3, language: "EN" },

    // Drinks
    { id: "d_water", categoryId: "drinks", label: "Water", sortOrder: 1, language: "EN" },
    { id: "d_milk", categoryId: "drinks", label: "Milk", sortOrder: 2, language: "EN" },

    // Feelings
    { id: "m_happy", categoryId: "feelings", label: "Happy", sortOrder: 1, language: "EN" },
    { id: "m_sad", categoryId: "feelings", label: "Sad", sortOrder: 2, language: "EN" },
    { id: "m_tired", categoryId: "feelings", label: "Tired", sortOrder: 3, language: "EN" },

    // Actions
    { id: "a_go", categoryId: "actions", label: "Go", sortOrder: 1, language: "EN" },
    { id: "a_play", categoryId: "actions", label: "Play", sortOrder: 2, language: "EN" },
    { id: "a_toilet", categoryId: "actions", label: "Toilet", sortOrder: 3, language: "EN" },
  ],
  settings: {
    gridColumns: 2,
    speakOnTap: true,
    rate: 0.95,
    parentPinEnabled: true,
    parentPin: "1234",
  },
};
