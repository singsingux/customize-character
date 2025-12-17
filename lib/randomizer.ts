import { CharacterAttributes } from '@/types/character';
import {
  FACE_STYLES,
  HAIR_STYLES,
  EYE_STYLES,
  NOSE_STYLES,
  MOUTH_STYLES,
  BACKGROUND_TYPES,
  SKIN_COLORS,
  HAIR_COLORS,
  EYE_COLORS,
  BACKGROUND_COLORS,
} from './constants';

// 배열에서 랜덤하게 선택하는 헬퍼 함수
function randomChoice<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// 범위 내에서 랜덤한 숫자를 생성하는 함수
function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// 랜덤 캐릭터를 생성하는 함수
export function generateRandomCharacter(): CharacterAttributes {
  const randomSkinToneId = Math.floor(Math.random() * 12) + 1; // 1-12
  const randomEyeId = Math.floor(Math.random() * 5) + 1; // 1-5
  const randomNoseId = Math.floor(Math.random() * 3) + 1; // 1-3
  
  return {
    face: {
      style: randomChoice(FACE_STYLES),
      color: SKIN_COLORS[randomSkinToneId - 1],
      skinToneItemId: randomSkinToneId,
    },
    hair: {
      style: randomChoice(HAIR_STYLES),
      color: randomChoice(HAIR_COLORS),
      hairItemId: Math.floor(Math.random() * 34) + 1,
    },
    eyes: {
      style: randomChoice(EYE_STYLES),
      color: randomChoice(EYE_COLORS),
      size: randomInRange(0.8, 1.3),
      spacing: randomInRange(-20, 20),
      rotation: randomInRange(-10, 10),
      eyeItemId: randomEyeId,
    },
    nose: {
      style: randomChoice(NOSE_STYLES),
      size: 1.0,
      position: {
        x: 0,
        y: 0,
      },
      noseItemId: randomNoseId,
    },
    mouth: {
      style: randomChoice(MOUTH_STYLES),
      size: 1.0,
      mouthItemId: Math.floor(Math.random() * 6) + 1,
      position: { x: 0, y: 0 },
    },
    features: {
      featureItemId: Math.floor(Math.random() * 12) + 1,
    },
    accessories: {
      headwear: {
        itemId: Math.random() > 0.5 ? Math.floor(Math.random() * 11) + 1 : undefined,
        position: { x: 0, y: 0 },
      },
      eyewear: {
        itemId: Math.random() > 0.5 ? Math.floor(Math.random() * 8) + 1 : undefined,
        position: { x: 0, y: 0 },
      },
      piercings: {
        itemId: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : undefined,
        position: { x: 0, y: 0 },
      },
    },
    background: {
      type: randomChoice(BACKGROUND_TYPES),
      color: randomChoice(BACKGROUND_COLORS),
      secondaryColor: randomChoice(BACKGROUND_COLORS),
    },
  };
}

