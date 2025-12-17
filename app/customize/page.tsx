'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CharacterPreview from '@/components/CharacterPreview';
import CustomizeControls from '@/components/CustomizeControls';
import { generateRandomCharacter } from '@/lib/randomizer';
import { DEFAULT_CHARACTER, SKIN_COLORS, HAIR_COLORS, EYE_COLORS } from '@/lib/constants';
import { CharacterAttributes } from '@/types/character';

type Category = 'skin-tone' | 'eyes' | 'nose' | 'mouth' | 'hair' | 'features' | 'accessories';

const categories: { id: Category; label: string; icon: string }[] = [
  { id: 'skin-tone', label: 'Skin Tone', icon: '/skin-tone.svg' },
  { id: 'eyes', label: 'Eyes', icon: '/eyes.svg' },
  { id: 'nose', label: 'Nose', icon: '/nose.svg' },
  { id: 'mouth', label: 'Mouth', icon: '/mouth.svg' },
  { id: 'hair', label: 'Hair', icon: '/hair.svg' },
  { id: 'features', label: 'Features', icon: '/features.svg' },
  { id: 'accessories', label: 'Accessories', icon: '/acc.svg' },
];

export default function CustomizePage() {
  const router = useRouter();
  const [character, setCharacter] = useState<CharacterAttributes>(DEFAULT_CHARACTER);
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('skin-tone');
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [isResetHovered, setIsResetHovered] = useState(false);
  const [isSurpriseMeHovered, setIsSurpriseMeHovered] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // localStorage에서 저장된 캐릭터 불러오기
    const savedCharacter = localStorage.getItem('currentCharacter');
    if (savedCharacter) {
      try {
        setCharacter(JSON.parse(savedCharacter));
      } catch (error) {
        console.error('Failed to load character:', error);
        setCharacter(generateRandomCharacter());
      }
    } else {
      setCharacter(generateRandomCharacter());
    }
  }, []);

  const handleRandomize = () => {
    // 각 카테고리에서 랜덤으로 선택
    const randomSkinToneId = Math.floor(Math.random() * 12) + 1; // 1-12
    const randomEyeId = Math.floor(Math.random() * 5) + 1; // 1-5
    const randomNoseId = Math.floor(Math.random() * 3) + 1; // 1-3
    const randomMouthId = Math.floor(Math.random() * 6) + 1; // 1-6
    const randomHairId = Math.floor(Math.random() * 34) + 1; // 1-34
    const randomFeatureId = Math.floor(Math.random() * 12) + 1; // 1-12
    
    // 랜덤 색상 선택
    const randomHairColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)];
    const randomEyeColor = EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)];
    
    // Accessories: 각 카테고리에서 랜덤 단일 선택
    const randomHeadwearId = Math.random() > 0.5 ? Math.floor(Math.random() * 11) + 1 : undefined;
    const randomEyewearId = Math.random() > 0.5 ? Math.floor(Math.random() * 8) + 1 : undefined;
    const randomPiercingsId = Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : undefined;
    
    const newCharacter = {
      ...character,
      face: {
        ...character.face,
        color: SKIN_COLORS[randomSkinToneId - 1],
        skinToneItemId: randomSkinToneId,
      },
      eyes: {
        ...character.eyes,
        eyeItemId: randomEyeId,
        color: randomEyeColor,
      },
      nose: {
        ...character.nose,
        noseItemId: randomNoseId,
      },
      mouth: {
        ...character.mouth,
        mouthItemId: randomMouthId,
      },
      hair: {
        ...character.hair,
        hairItemId: randomHairId,
        color: randomHairColor,
      },
      features: {
        featureItemId: randomFeatureId,
      },
      accessories: {
        headwear: { 
          itemId: randomHeadwearId,
          position: { x: 0, y: 0 }
        },
        eyewear: { 
          itemId: randomEyewearId,
          position: { x: 0, y: 0 }
        },
        piercings: { 
          itemId: randomPiercingsId,
          position: { x: 0, y: 0 }
        },
      },
    };
    
    setCharacter(newCharacter);
    localStorage.setItem('currentCharacter', JSON.stringify(newCharacter));
  };

  const handleReset = () => {
    // Skin Tone의 첫 번째 아이템만 선택, 모든 슬라이더 값은 기본값(0 또는 1.0)으로 리셋
    const resetCharacter = {
      ...character,
      face: {
        ...character.face,
        color: SKIN_COLORS[0],
        skinToneItemId: 1,
      },
      eyes: {
        ...character.eyes,
        eyeItemId: undefined,
        spacing: 0, // 기본값으로 리셋
      },
      nose: {
        ...character.nose,
        noseItemId: undefined,
        size: 1.0, // 기본값으로 리셋
        position: { x: 0, y: 0 }, // 기본값으로 리셋
      },
      mouth: {
        ...character.mouth,
        mouthItemId: undefined,
        size: 1.0, // 기본값으로 리셋
        position: { x: 0, y: 0 }, // 기본값으로 리셋
      },
      hair: {
        ...character.hair,
        hairItemId: undefined,
      },
      features: {
        featureItemId: undefined,
      },
      accessories: {
        headwear: { 
          itemId: undefined,
          position: { x: 0, y: 0 }
        },
        eyewear: { 
          itemId: undefined,
          position: { x: 0, y: 0 }
        },
        piercings: { 
          itemId: undefined,
          position: { x: 0, y: 0 }
        },
      },
    };
    
    setCharacter(resetCharacter);
    localStorage.setItem('currentCharacter', JSON.stringify(resetCharacter));
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // 현재 캐릭터 상태를 localStorage에 저장
      localStorage.setItem('currentCharacter', JSON.stringify(character));
      console.log('Character saved to localStorage:', character);
      
      // 약간의 지연 후 페이지 이동
      setTimeout(() => {
        window.location.href = '/save';
      }, 100);
    } catch (error) {
      console.error('Save failed:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const updateCharacter = (updates: Partial<CharacterAttributes>) => {
    setCharacter(prev => {
      const newCharacter = { ...prev, ...updates };
      // 상태 변경 시 localStorage에도 저장
      localStorage.setItem('currentCharacter', JSON.stringify(newCharacter));
      return newCharacter;
    });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl"> Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden relative fade-in">
      {/* 메인 컨텐츠 - 수직 레이아웃 */}
      <div className="flex-1 flex flex-col overflow-auto" style={{ paddingTop: '72px', paddingBottom: '24px' }}>
        
        {/* 상단: 프리뷰 */}
        <div className="flex items-center justify-center" style={{ paddingTop: '24px', paddingBottom: '20px' }}>
          <div 
            className="rounded-full flex items-center justify-center"
            style={{
              width: '300px',
              height: '300px',
              backgroundColor: '#F7F9FB',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <CharacterPreview character={character} size={300} />
          </div>
        </div>

        {/* 중간: 액션 버튼들 */}
        <div className="flex items-center justify-center" style={{ gap: '12px', paddingBottom: '24px' }}>
          {/* Surprise Me 버튼 */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={handleRandomize}
              onMouseEnter={() => setIsSurpriseMeHovered(true)}
              onMouseLeave={() => setIsSurpriseMeHovered(false)}
              className="surprise-me-btn rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
              style={{
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '20px',
                paddingRight: '20px',
                height: '48px',
                fontSize: '14px',
                lineHeight: '140%',
                fontWeight: 600,
                backgroundColor: '#FFFFFF',
                border: '1px solid #EDF2F7',
                color: '#010820',
                gap: '6px'
              }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-on-hover"
                style={{ width: '20px', height: '20px', transition: 'transform 0.3s ease' }}
              >
                <path d="M10.6045 3.87207C11.1042 2.60696 12.8958 2.60696 13.3955 3.87207L15.0605 8.09668C15.1939 8.43471 15.4452 8.71098 15.7646 8.87695L15.9062 8.94141L20.1299 10.6074C21.3951 11.1072 21.3951 12.8978 20.1299 13.3975L15.9062 15.0635C15.5197 15.2159 15.213 15.5216 15.0605 15.9082L13.3955 20.1318C12.9269 21.3182 11.3229 21.3922 10.7129 20.3535L10.6045 20.1318L8.93945 15.9082C8.78699 15.5216 8.48034 15.2159 8.09375 15.0635L3.87012 13.3975L3.64844 13.29C2.67874 12.7206 2.67874 11.2843 3.64844 10.7148L3.87012 10.6074L8.09375 8.94141C8.43203 8.80799 8.70901 8.55696 8.875 8.2373L8.93945 8.09668L10.6045 3.87207ZM10.334 8.64648C10.029 9.41949 9.41661 10.032 8.64355 10.3369L4.42188 12.002L8.64355 13.668C9.41672 13.9729 10.029 14.5852 10.334 15.3584L12 19.5801L13.666 15.3584C13.971 14.5852 14.5833 13.9729 15.3564 13.668L19.5781 12.002L15.3564 10.3369C14.5834 10.032 13.971 9.41949 13.666 8.64648L12 4.4248L10.334 8.64648Z" fill="#010820"/>
              </svg>
              Surprise Me
            </button>
          </div>

          {/* Reset 버튼 (아이콘만) */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={handleReset}
              onMouseEnter={() => setIsResetHovered(true)}
              onMouseLeave={() => setIsResetHovered(false)}
              className="reset-btn rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #EDF2F7'
              }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-on-hover"
                style={{ width: '20px', height: '20px', transition: 'transform 0.3s ease' }}
              >
                <path d="M3.75 11.25C4.16421 11.25 4.5 11.5858 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C14.4515 19.5 16.6268 18.3229 17.9951 16.5039H16.0068C15.5927 16.5038 15.2569 16.168 15.2568 15.7539C15.2569 15.3398 15.5927 15.004 16.0068 15.0039H20.25C20.664 15.0041 20.999 15.3399 20.999 15.7539V19.9961C20.999 20.4102 20.664 20.7459 20.25 20.7461C19.8358 20.7461 19.5 20.4103 19.5 19.9961V16.9727C17.8881 19.3994 15.1317 21 12 21C7.02944 21 3 16.9706 3 12C3 11.5858 3.33579 11.25 3.75 11.25ZM12 3C16.9706 3 21 7.02944 21 12C21 12.4142 20.6642 12.75 20.25 12.75C19.8358 12.75 19.5 12.4142 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.54851 4.5 7.37322 5.67714 6.00488 7.49609H7.99316C8.40728 7.49617 8.7431 7.83198 8.74316 8.24609C8.74314 8.66024 8.4073 8.99602 7.99316 8.99609H3.75C3.336 8.99586 3.001 8.66014 3.00098 8.24609V4.00391C3.00098 3.58984 3.33599 3.25414 3.75 3.25391C4.16419 3.25393 4.5 3.58971 4.5 4.00391V7.02734C6.11191 4.60056 8.86829 3 12 3Z" fill="#010820"/>
              </svg>
            </button>
          </div>
        </div>

        {/* 하단: 카테고리 메뉴 + 컨트롤 */}
        <div className="flex-1 flex flex-col" style={{ maxWidth: '100%', paddingLeft: '16px', paddingRight: '16px' }}>
          
          {/* 카테고리 메뉴 (가로 스크롤) */}
          <div className="w-full overflow-x-auto horizontal-scroll" style={{ paddingBottom: '16px' }}>
            <div className="flex gap-3" style={{ minWidth: 'fit-content', justifyContent: 'center' }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl transition-all duration-200"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: selectedCategory === category.id ? '#F7F9FB' : '#FFFFFF',
                    border: `1px solid ${selectedCategory === category.id ? '#3B82F6' : '#EDF2F7'}`,
                    boxShadow: selectedCategory === category.id ? '0 1px 8px rgba(59, 130, 246, 0.16)' : '0 1px 2px rgba(48, 58, 75, 0.08)',
                  }}
                >
                  <Image 
                    src={category.icon}
                    alt={category.label}
                    width={28}
                    height={28}
                    unoptimized
                    style={{ 
                      width: '28px', 
                      height: '28px',
                      opacity: selectedCategory === category.id ? 1 : 0.4,
                      marginBottom: '6px'
                    }}
                  />
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: selectedCategory === category.id ? '#010820' : '#A0AEC0',
                    textAlign: 'center',
                    lineHeight: '1.2'
                  }}>
                    {category.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 컨트롤 패널 */}
          <div 
            className="flex-1 overflow-auto"
            style={{
              backgroundColor: '#F7F9FB',
              border: '1px solid #EDF2F7',
              borderRadius: '16px',
              boxShadow: '0 1px 8px rgba(48, 58, 75, 0.08)',
              padding: '20px',
              marginBottom: '16px'
            }}
          >
            <CustomizeControls 
              character={character} 
              updateCharacter={updateCharacter}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

