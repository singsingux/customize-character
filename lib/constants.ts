// 캐릭터 커스터마이징에 사용되는 상수들

export const FACE_STYLES = ['round', 'oval', 'square', 'heart'] as const;
export const HAIR_STYLES = ['short', 'long', 'curly', 'bald', 'ponytail'] as const;
export const EYE_STYLES = ['normal', 'happy', 'surprised', 'sleepy', 'wink'] as const;
export const NOSE_STYLES = ['small', 'medium', 'large'] as const;
export const MOUTH_STYLES = ['smile', 'neutral', 'laugh', 'sad', 'surprise'] as const;
export const BACKGROUND_TYPES = ['solid', 'gradient', 'pattern'] as const;

// 색상 팔레트 - 각 skin-tone-item 이미지의 실제 색상
export const SKIN_COLORS = [
  '#FFF0EE', // item1 - 매우 연한 피치
  '#FFE2DE', // item2 - 연한 피치
  '#FDD7C8', // item3 - 피치
  '#EA936B', // item4 - 살구색
  '#BA744D', // item5 - 브라운
  '#BA744D', // item6 - 브라운
  '#54382E', // item7 - 어두운 브라운
  '#010820', // item8 - 검정색
  '#FF3187', // item9 - 핑크색
  '#F9D777', // item10 - 노란색
  '#F9D777', // item11 - 노란색
  '#00F030', // item12 - 초록색
];

export const HAIR_COLORS = [
  '#FBFBFB',
  '#AEAEAB',
  '#2E2A28',
  '#563B2D',
  '#814813',
  '#863517',
  '#E57100',
  '#EAB57E',
  '#E51200',
  '#FF7A00',
  '#FFCD00',
  '#53BD00',
  '#3698FF',
  '#9A70F5',
  '#FC62A6',
  'gradient', // 마지막은 gradient
];

export const EYE_COLORS = [
  '#AEAEAB',
  '#2E2A28',
  '#563B2D',
  '#814813',
  '#863517',
  '#E57100',
  '#EAB57E',
  '#E51200',
  '#FF7A00',
  '#FFCD00',
  '#53BD00',
  '#3698FF',
  '#9A70F5',
  '#FC62A6',
  'gradient1', // #36A3FF와 #863517
  'gradient2', // #53BD00와 #814813
];

export const BACKGROUND_COLORS = [
  '#FF6B6B', // 빨강
  '#4ECDC4', // 청록
  '#45B7D1', // 하늘색
  '#FFA07A', // 연한 주황
  '#98D8C8', // 민트
  '#F7DC6F', // 노랑
  '#BB8FCE', // 연한 보라
  '#F8B500', // 주황
];

// 기본값
export const DEFAULT_CHARACTER = {
  face: {
    style: 'round' as const,
    color: SKIN_COLORS[0],
    skinToneItemId: 1,
  },
  hair: {
    style: 'short' as const,
    color: HAIR_COLORS[0],
    hairItemId: undefined,
  },
  eyes: {
    style: 'normal' as const,
    color: EYE_COLORS[0],
    size: 1,
    spacing: 0,
    rotation: 0,
    eyeItemId: 1,
  },
  nose: {
    style: 'medium' as const,
    size: 1.0,
    position: { x: 0, y: 0 },
    noseItemId: undefined,
  },
  mouth: {
    style: 'smile' as const,
    size: 1.0,
    mouthItemId: undefined,
    position: { x: 0, y: 0 },
  },
  features: {
    featureItemId: undefined,
  },
  accessories: {
    headwear: {
      itemId: undefined,
      position: { x: 0, y: 0 },
    },
    eyewear: {
      itemId: undefined,
      position: { x: 0, y: 0 },
    },
    piercings: {
      itemId: undefined,
      position: { x: 0, y: 0 },
    },
  },
  background: {
    type: 'solid' as const,
    color: BACKGROUND_COLORS[0],
  },
};

