import { Image } from "react-native";
import { WorkbookState } from "../models/types";

export const SEED: WorkbookState = {
  categories: [
    // To seed a bundled image, set imageUri to Image.resolveAssetSource(require("path/to/image.png")).uri.
    { id: "people", name: "People", nameZh: "人", emoji: "👨‍👩‍👧", color: "#E7F0FF", sortOrder: 1 },
    { id: "food", name: "Food", nameZh: "食物", emoji: "🍜", color: "#FFF3E6", sortOrder: 2 },
    { id: "drinks", name: "Drinks", nameZh: "饮料", emoji: "🧃", color: "#EAFBF1", sortOrder: 3 },
    { id: "feelings", name: "Feelings", nameZh: "感觉", emoji: "🙂", color: "#F3E8FF", sortOrder: 4 },
    { id: "actions", name: "Actions", nameZh: "动作", emoji: "🏃", color: "#EFFFF8", sortOrder: 5 },
    { id: "animals", name: "Animals", nameZh: "动物", emoji: "🐈", color: "#EFFFF8", sortOrder: 6 },
    { id: "colors", name: "Colors", nameZh: "颜色", emoji: "🏃", color: "#EFFFF8", sortOrder: 7 },
    { id: "help", name: "Help", nameZh: "帮助", emoji: "🆘", color: "#FFECEC", sortOrder: 8 },
  ],
  cards: [
    // Quick
    { id: "p_mama", categoryId: "people", label: "mother",labelZh: "妈妈", sortOrder: 1, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/mother2.jpg")).uri },
    { id: "p_bab", categoryId: "people", label: "father",labelZh: "爸爸", sortOrder: 2, language: "CH" },
    { id: "p_brother", categoryId: "people", label: "Brother",labelZh: "哥哥", sortOrder: 3, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/brother.jpg")).uri },
    { id: "p_grandmother", categoryId: "people", label: "Grandmother",labelZh: "外婆", sortOrder: 4, language: "CH" },
    { id: "p_me", categoryId: "people", label: "me",labelZh: "我", sortOrder: 5, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/me.jpg")).uri },


    // Food
    { id: "f_apple", categoryId: "food", label: "Apple",labelZh: "苹果", sortOrder: 1, language: "EN" },
    { id: "f_rice", categoryId: "food", label: "Rice",labelZh: "饭", sortOrder: 2, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/rice.jpg")).uri },
    { id: "f_noodle", categoryId: "food", label: "Noodle",labelZh: "面", sortOrder: 3, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/noodle.jpg")).uri },

    // Drinks
    { id: "d_water", categoryId: "drinks", label: "Water",labelZh: "水", sortOrder: 1, language: "EN" },
    { id: "d_milk", categoryId: "drinks", label: "Milk", sortOrder: 2, language: "EN" },
    { id: "d_chagee", categoryId: "drinks", label: "Chagee", labelZh: "茶姬", sortOrder: 3, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/chagee.jpg")).uri },

    // Feelings
    { id: "m_happy", categoryId: "feelings", label: "Happy", labelZh: "开心", sortOrder: 1, language: "CH" },
    { id: "m_sad", categoryId: "feelings", label: "Sad", labelZh: "伤心", sortOrder: 2, language: "CH" },
    { id: "m_tired", categoryId: "feelings", label: "Tired", labelZh: "累", sortOrder: 3, language: "CH" },
    { id: "m_angry", categoryId: "feelings", label: "Angry", labelZh: "生气", sortOrder: 4, language: "CH" },

    // Actions
    { id: "a_go", categoryId: "actions", label: "Go",labelZh: "去", sortOrder: 1, language: "CH" },
    { id: "a_play", categoryId: "actions", label: "Play", labelZh: "玩", sortOrder: 2, language: "CH" },
    { id: "a_toilet", categoryId: "actions", label: "Toilet", labelZh: "厕所",sortOrder: 3, language: "CH" },
    { id: "a_sleep", categoryId: "actions", label: "Sleep", labelZh: "睡觉",sortOrder: 4, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/sleep.jpg")).uri },
    { id: "a_study", categoryId: "actions", label: "Study", labelZh: "读书",sortOrder: 5, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/study.jpg")).uri },
  
  ],
  settings: {
    gridColumns: 2,
    speakOnTap: true,
    rate: 0.95,
    parentPinEnabled: true,
    parentPin: "1234",
  },
};
