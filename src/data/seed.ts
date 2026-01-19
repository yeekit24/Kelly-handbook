import { Image } from "react-native";
import { WorkbookState } from "../models/types";

export const SEED: WorkbookState = {
  categories: [
    // To seed a bundled image, set imageUri to Image.resolveAssetSource(require("path/to/image.png")).uri.
    { id: "quick", name: "Quick", emoji: "⚡", color: "#E7F0FF", sortOrder: 1 },
    { id: "people", name: "People", nameZh: "人", emoji: "👨‍👩‍👧", color: "#E7F0FF", sortOrder: 2 },
    { id: "food", name: "Food", nameZh: "食物", emoji: "🍜", color: "#FFF3E6", sortOrder: 3 },
    { id: "drinks", name: "Drinks", nameZh: "饮料", emoji: "🧃", color: "#EAFBF1", sortOrder: 4 },
    { id: "feelings", name: "Feelings", nameZh: "感觉", emoji: "🙂", color: "#F3E8FF", sortOrder: 5 },
    { id: "actions", name: "Actions", nameZh: "动作", emoji: "🏃", color: "#EFFFF8", sortOrder: 6 },
    { id: "items", name: "Items", nameZh: "东西", emoji: "💡", color: "#EAFBF1", sortOrder: 7 },
    { id: "help", name: "Help", nameZh: "帮助", emoji: "🆘", color: "#EFFFF8", sortOrder: 8 },
    { id: "body", name: "Body", nameZh: "身体部位", emoji: "🧍", color: "#FFECEC", sortOrder: 9 },
    { id: "animals", name: "Animals", nameZh: "动物", emoji: "🐈", color: "#EFFFF8", sortOrder: 10 },
    { id: "colors", name: "Colors", nameZh: "颜色", emoji: "🏃", color: "#EFFFF8", sortOrder: 11 },
  ],
  cards: [
    // Quick
    { id: "q_want", categoryId: "quick", label: "I want",labelZh: "我要", sortOrder: 1, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/iwant.png")).uri },
    { id: "q_dunwant", categoryId: "quick", label: "I don't want",labelZh: "不要", sortOrder: 2, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/dontwant.png")).uri },
    { id: "q_thankyou", categoryId: "quick", label: "thankyou",labelZh: "谢谢", sortOrder: 3, language: "EN", imageUri: Image.resolveAssetSource(require("../../assets/images/thankyou.jpg")).uri },
    { id: "q_welcome", categoryId: "quick", label: "welcome",labelZh: "欢迎", sortOrder: 4, language: "EN" },
    { id: "q_that", categoryId: "quick", label: "this",labelZh: "那个", sortOrder: 5, language: "CH"},
    { id: "q_this", categoryId: "quick", label: "that",labelZh: "这个", sortOrder: 6, language: "CH" },

    { id: "p_mother", categoryId: "people", label: "mother",labelZh: "妈妈", sortOrder: 1, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/mother2.jpg")).uri },
    { id: "p_father", categoryId: "people", label: "father",labelZh: "爸爸", sortOrder: 2, language: "CH" },
    { id: "p_brother", categoryId: "people", label: "Brother",labelZh: "哥哥", sortOrder: 3, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/brother.jpg")).uri },
    { id: "p_grandmother", categoryId: "people", label: "Grandmother",labelZh: "外婆", sortOrder: 4, language: "CH" },
    { id: "p_me", categoryId: "people", label: "me",labelZh: "我", sortOrder: 5, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/me.jpg")).uri },
    { id: "p_him", categoryId: "people", label: "him",labelZh: "他", sortOrder: 6, language: "CH" },
    { id: "p_you", categoryId: "people", label: "you",labelZh: "你", sortOrder: 7, language: "CH" },


    // Food
    { id: "f_apple", categoryId: "food", label: "Apple",labelZh: "苹果", sortOrder: 1, language: "EN" },
    { id: "f_rice", categoryId: "food", label: "Rice",labelZh: "饭", sortOrder: 2, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/rice.jpg")).uri },
    { id: "f_noodle", categoryId: "food", label: "Noodle",labelZh: "面", sortOrder: 3, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/noodle.jpg")).uri },
    { id: "f_fries", categoryId: "food", label: "Fries",labelZh: "薯条", sortOrder: 4, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/fries.jpg")).uri },
    { id: "f_fish", categoryId: "food", label: "Fish",labelZh: "鱼肉", sortOrder: 5, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/fishs.jpg")).uri },
    { id: "f_chicken", categoryId: "food", label: "Chiken",labelZh: "鸡肉", sortOrder: 6, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/chicken.jpg")).uri },
    { id: "f_vegetable", categoryId: "food", label: "Vegetable",labelZh: "菜", sortOrder: 7, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/vegetable.jpg")).uri },

    // Drinks
    { id: "d_water", categoryId: "drinks", label: "Water",labelZh: "水", sortOrder: 1, language: "EN", imageUri: Image.resolveAssetSource(require("../../assets/images/water.jpg")).uri },
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
    { id: "a_dance", categoryId: "actions", label: "Dance", labelZh: "跳舞",sortOrder: 6, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/dance.jpg")).uri },
    { id: "a_listen", categoryId: "actions", label: "Listen", labelZh: "听",sortOrder: 7, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/listen.jpg")).uri },
    { id: "a_wash", categoryId: "actions", label: "Wash", labelZh: "洗",sortOrder: 8, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/wash.png")).uri },
    { id: "a_wait", categoryId: "actions", label: "Wait",labelZh: "等", sortOrder: 9, language: "CH" },
    { id: "a_look", categoryId: "actions", label: "Look", labelZh: "看",sortOrder: 10, language: "CH" },
    { id: "a_clean", categoryId: "actions", label: "Clean", labelZh: "收拾",sortOrder: 11, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/clean.jpg")).uri },
  
    
    { id: "b_hand", categoryId: "body", label: "Hand", labelZh: "手",sortOrder: 1, language: "CH" },
    { id: "b_leg", categoryId: "body", label: "Leg", labelZh: "腿",sortOrder: 2, language: "CH" },
    { id: "b_head", categoryId: "body", label: "Head", labelZh: "头",sortOrder: 3, language: "CH" },
    { id: "b_hair", categoryId: "body", label: "Hair", labelZh: "头发",sortOrder: 4, language: "CH" },
    { id: "b_eye", categoryId: "body", label: "Eyes", labelZh: "眼睛",sortOrder: 5, language: "CH" },
    
    //items
    { id: "i_book", categoryId: "items", label: "Book", labelZh: "书",sortOrder: 1, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/books.jpg")).uri },
    { id: "i_book", categoryId: "items", label: "Pen", labelZh: "笔",sortOrder: 2, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/pen.jpg")).uri },
    { id: "i_eraser", categoryId: "items", label: "Eraser", labelZh: "胶擦",sortOrder: 3, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/eraser.jpg")).uri },
    { id: "i_ball", categoryId: "items", label: "Ball", labelZh: "球",sortOrder: 4, language: "CH" },
    { id: "i_shoe", categoryId: "items", label: "Shoe", labelZh: "鞋子",sortOrder: 5, language: "CH", imageUri: Image.resolveAssetSource(require("../../assets/images/shoes.jpg")).uri },
    { id: "i_toys", categoryId: "items", label: "Toy", labelZh: "玩具",sortOrder: 6, language: "CH" },
  

    //Help
    { id: "h_not_here", categoryId: "help", label: "me",labelZh: "这里没有", sortOrder: 1, language: "CH" },
    { id: "h_why", categoryId: "help", label: "why",labelZh: "为什么", sortOrder: 2, language: "CH" },
    { id: "h_who", categoryId: "help", label: "who",labelZh: "谁", sortOrder: 3, language: "CH" },
    { id: "h_what", categoryId: "help", label: "what",labelZh: "什么", sortOrder: 4, language: "CH" },
    { id: "h_where", categoryId: "help", label: "where",labelZh: "哪里", sortOrder: 5, language: "CH" },
    { id: "h_when", categoryId: "help", label: "when",labelZh: "几时", sortOrder: 6, language: "CH" },

  ],
  settings: {
    gridColumns: 2,
    speakOnTap: true,
    rate: 0.95,
    parentPinEnabled: true,
    parentPin: "1234",
  },
};
