// 캐릭터의 각 요소에 대한 타입 정의

export type FaceStyle = 'round' | 'oval' | 'square' | 'heart';
export type HairStyle = 'short' | 'long' | 'curly' | 'bald' | 'ponytail';
export type EyeStyle = 'normal' | 'happy' | 'surprised' | 'sleepy' | 'wink';
export type NoseStyle = 'small' | 'medium' | 'large';
export type MouthStyle = 'smile' | 'neutral' | 'laugh' | 'sad' | 'surprise';
export type BackgroundType = 'solid' | 'gradient' | 'pattern';

export interface Position {
  x: number;
  y: number;
}

export interface CharacterAttributes {
  // Face
  face: {
    style: FaceStyle;
    color: string;
    skinToneItemId?: number; // 선택된 skin tone 아이템 번호 (1-12)
  };
  
  // Hair
  hair: {
    style: HairStyle;
    color: string;
    hairItemId?: number; // 선택된 hair 아이템 번호
  };
  
  // Eyes
  eyes: {
    style: EyeStyle;
    color: string;
    size: number;
    spacing: number;
    rotation: number;
    eyeItemId?: number; // 선택된 eye 아이템 번호 (1-5)
  };
  
  // Nose
  nose: {
    style: NoseStyle;
    size: number;
    position: Position;
    noseItemId?: number; // 선택된 nose 아이템 번호
  };
  
  // Mouth
  mouth: {
    style: MouthStyle;
    size: number;
    mouthItemId?: number; // 선택된 mouth 아이템 번호
    position?: Position; // mouth 위치
  };
  
  // Features
  features: {
    featureItemId?: number; // 선택된 feature 아이템 번호
  };
  
  // Accessories (Single-select by category)
  accessories: {
    headwear: {
      itemId?: number; // 선택된 headwear 아이템 (1-11)
      position: Position; // headwear 위치
    };
    eyewear: {
      itemId?: number; // 선택된 eyewear 아이템 (1-8)
      position: Position; // eyewear 위치
    };
    piercings: {
      itemId?: number; // 선택된 piercings 아이템 (1-5)
      position: Position; // piercings 위치
    };
  };
  
  // Background
  background: {
    type: BackgroundType;
    color: string;
    secondaryColor?: string; // gradient나 pattern에서 사용
  };
}

