export type Category = {
    id: string;
    name: string;
    emoji?: string;      // simple icon for MVP
    color?: string;
    sortOrder: number;
  };
  
export type AacCard = {
    id: string;
    categoryId: string;
    label: string;
    labelZh?: string;
    speakText?: string;  // defaults to label
    imageUri?: string;   // local file uri from ImagePicker
    isQuick?: boolean;
    sortOrder: number;
  };
  
  export type Settings = {
    gridColumns: 2 | 3 | 4;
    speakOnTap: boolean;
    voice?: string;
    rate: number; // 0.1 - 2
    parentPinEnabled: boolean;
    parentPin: string;  // simple for MVP
  };
  
  export type WorkbookState = {
    categories: Category[];
    cards: AacCard[];
    settings: Settings;
  };
  
