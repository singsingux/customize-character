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
      {/* 왼쪽: Floating Category Menu - Fixed */}
      <div 
        className="fixed flex items-center z-40"
        style={{
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        <div className="relative">
          <div 
            className="flex flex-col"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EDF2F7',
              boxShadow: '0 1px 8px rgba(48, 58, 75, 0.08)',
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
              overflow: 'hidden'
            }}
          >
            {categories.map((category, index) => (
              <div key={category.id}>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: selectedCategory === category.id ? '#F7F9FB' : 'transparent'
                  }}
                >
                  <Image 
                    src={category.icon}
                    alt={category.label}
                    width={24}
                    height={24}
                    style={{ 
                      width: '24px', 
                      height: '24px',
                      opacity: selectedCategory === category.id ? 1 : 0.4
                    }}
                  />
                </button>
                
                {/* Divider - 마지막 메뉴 제외 */}
                {index < categories.length - 1 && (
                  <div 
                    style={{
                      height: '1px',
                      backgroundColor: '#EDF2F7',
                      width: '100%'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          
          {/* Tooltips - 메뉴 컨테이너 밖에 렌더링 */}
          {categories.map((category, index) => (
            hoveredCategory === category.id && (
              <div
                key={`tooltip-${category.id}`}
                className="absolute left-full whitespace-nowrap pointer-events-none"
                style={{
                  top: `${28 + index * 57}px`,
                  transform: 'translateY(-50%)',
                  marginLeft: '4px',
                  zIndex: 100
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#303A4B',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#FFFFFF',
                    boxShadow: '0 1px 8px rgba(48, 58, 75, 0.08)'
                  }}
                >
                  {category.label}
                  {/* 왼쪽을 가리키는 꼬리 */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-4px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 0,
                      height: 0,
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                      borderRight: '4px solid #303A4B'
                    }}
                  />
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* 메인 컨텐츠 - Flex Layout */}
      <div className="flex-1 flex items-center" style={{ paddingTop: '88px', paddingBottom: '40px', paddingLeft: '32px', paddingRight: '32px' }}>
        <div className="w-full h-full flex" style={{ gap: '32px' }}>
          
          {/* 좌측: 플로팅 메뉴 + 컨트롤 (고정 width) */}
          <div className="flex items-center" style={{ paddingLeft: '48px' }}>
            <div 
              className="overflow-auto"
              style={{
                height: '650px',
                width: '480px',
                backgroundColor: '#F7F9FB',
                border: '1px solid #EDF2F7',
                borderRadius: '16px',
                boxShadow: '0 1px 8px rgba(48, 58, 75, 0.08)'
              }}
            >
              <div className="h-full overflow-y-auto" style={{ padding: '0px 32px 32px 32px', position: 'relative' }}>
                <CustomizeControls 
                  character={character} 
                  updateCharacter={updateCharacter}
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>
          </div>

          {/* 우측: 프리뷰 + 액션 버튼 (flex-1로 남은 공간 차지하며 center) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              {/* 원형 프리뷰 (540px) */}
              <div 
                className="rounded-full flex items-center justify-center mb-6"
                style={{
                  width: '540px',
                  height: '540px',
                  backgroundColor: '#F7F9FB',
                  overflow: 'auto',
                  position: 'relative'
                }}
              >
                <CharacterPreview character={character} size={540} />
              </div>

              {/* 액션 버튼들 (56px) */}
              <div className="flex items-center" style={{ gap: '12px' }}>
                {/* Surprise Me 버튼 */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={handleRandomize}
                    onMouseEnter={() => setIsSurpriseMeHovered(true)}
                    onMouseLeave={() => setIsSurpriseMeHovered(false)}
                    className="surprise-me-btn rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                    style={{
                      paddingTop: '16px',
                      paddingBottom: '16px',
                      paddingLeft: '24px',
                      paddingRight: '24px',
                      height: '56px',
                      fontSize: '16px',
                      lineHeight: '140%',
                      fontWeight: 600,
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #EDF2F7',
                      color: '#010820',
                      gap: '8px'
                    }}
                  >
                    <Image
                      src="/star.svg"
                      alt="Surprise Me"
                      width={24}
                      height={24}
                      className="rotate-on-hover"
                      style={{ width: '24px', height: '24px', transition: 'transform 0.3s ease' }}
                    />
                    Surprise Me
                  </button>
                  
                  {/* Surprise Me Tooltip */}
                  {isSurpriseMeHovered && (
                    <div
                      className="absolute bottom-full left-1/2 whitespace-nowrap pointer-events-none"
                      style={{
                        transform: 'translate(-50%, -8px)',
                        marginBottom: '4px',
                        zIndex: 100
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#303A4B',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#FFFFFF',
                          boxShadow: '0 1px 8px rgba(48, 58, 75, 0.08)'
                        }}
                      >
                        Randomize avatar
                        {/* 아래쪽을 가리키는 꼬리 */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '4px solid transparent',
                            borderRight: '4px solid transparent',
                            borderTop: '4px solid #303A4B'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Reset 버튼 (아이콘만) */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={handleReset}
                    onMouseEnter={() => setIsResetHovered(true)}
                    onMouseLeave={() => setIsResetHovered(false)}
                    className="reset-btn rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                    style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #EDF2F7'
                    }}
                  >
                    <Image
                      src="/reset.svg"
                      alt="Reset"
                      width={24}
                      height={24}
                      className="rotate-on-hover"
                      style={{ width: '24px', height: '24px', transition: 'transform 0.3s ease' }}
                    />
                  </button>
                  
                  {/* Reset Tooltip */}
                  {isResetHovered && (
                    <div
                      className="absolute bottom-full left-1/2 whitespace-nowrap pointer-events-none"
                      style={{
                        transform: 'translate(-50%, -8px)',
                        marginBottom: '4px',
                        zIndex: 100
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: '#303A4B',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#FFFFFF',
                          boxShadow: '0 1px 8px rgba(48, 58, 75, 0.08)'
                        }}
                      >
                        Reset
                        {/* 아래쪽을 가리키는 꼬리 */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '4px solid transparent',
                            borderRight: '4px solid transparent',
                            borderTop: '4px solid #303A4B'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

