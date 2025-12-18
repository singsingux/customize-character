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
    <div 
      className="h-screen flex flex-col overflow-hidden relative fade-in" 
      style={{ 
        height: '100vh',
        maxHeight: '-webkit-fill-available'
      }}
    >
      {/* 왼쪽: Floating Category Menu - Fixed (데스크톱만) */}
      <div 
        className="hidden lg:flex fixed items-center z-40"
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
                    unoptimized
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

      {/* 데스크톱 메인 컨텐츠 */}
      <div className="hidden lg:flex flex-1 items-center" style={{ paddingTop: '88px', paddingBottom: '40px', paddingLeft: '32px', paddingRight: '32px' }}>
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
                  isMobile={false}
                />
              </div>
            </div>
          </div>

          {/* 우측: 프리뷰 + 액션 버튼 (flex-1로 남은 공간 차지하며 center) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              {/* 원형 프리뷰 (반응형) */}
              <div 
                className="rounded-full flex items-center justify-center mb-6 desktop-preview-container"
                style={{
                  width: '540px',
                  height: '540px',
                  backgroundColor: '#F7F9FB',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div 
                  className="desktop-preview-inner"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                >
                  <CharacterPreview character={character} size={540} />
                </div>
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
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="rotate-on-hover"
                      style={{ width: '24px', height: '24px', transition: 'transform 0.3s ease' }}
                    >
                      <path d="M10.6045 3.87207C11.1042 2.60696 12.8958 2.60696 13.3955 3.87207L15.0605 8.09668C15.1939 8.43471 15.4452 8.71098 15.7646 8.87695L15.9062 8.94141L20.1299 10.6074C21.3951 11.1072 21.3951 12.8978 20.1299 13.3975L15.9062 15.0635C15.5197 15.2159 15.213 15.5216 15.0605 15.9082L13.3955 20.1318C12.9269 21.3182 11.3229 21.3922 10.7129 20.3535L10.6045 20.1318L8.93945 15.9082C8.78699 15.5216 8.48034 15.2159 8.09375 15.0635L3.87012 13.3975L3.64844 13.29C2.67874 12.7206 2.67874 11.2843 3.64844 10.7148L3.87012 10.6074L8.09375 8.94141C8.43203 8.80799 8.70901 8.55696 8.875 8.2373L8.93945 8.09668L10.6045 3.87207ZM10.334 8.64648C10.029 9.41949 9.41661 10.032 8.64355 10.3369L4.42188 12.002L8.64355 13.668C9.41672 13.9729 10.029 14.5852 10.334 15.3584L12 19.5801L13.666 15.3584C13.971 14.5852 14.5833 13.9729 15.3564 13.668L19.5781 12.002L15.3564 10.3369C14.5834 10.032 13.971 9.41949 13.666 8.64648L12 4.4248L10.334 8.64648Z" fill="#010820"/>
                    </svg>
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
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="rotate-on-hover"
                      style={{ width: '24px', height: '24px', transition: 'transform 0.3s ease' }}
                    >
                      <path d="M3.75 11.25C4.16421 11.25 4.5 11.5858 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C14.4515 19.5 16.6268 18.3229 17.9951 16.5039H16.0068C15.5927 16.5038 15.2569 16.168 15.2568 15.7539C15.2569 15.3398 15.5927 15.004 16.0068 15.0039H20.25C20.664 15.0041 20.999 15.3399 20.999 15.7539V19.9961C20.999 20.4102 20.664 20.7459 20.25 20.7461C19.8358 20.7461 19.5 20.4103 19.5 19.9961V16.9727C17.8881 19.3994 15.1317 21 12 21C7.02944 21 3 16.9706 3 12C3 11.5858 3.33579 11.25 3.75 11.25ZM12 3C16.9706 3 21 7.02944 21 12C21 12.4142 20.6642 12.75 20.25 12.75C19.8358 12.75 19.5 12.4142 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.54851 4.5 7.37322 5.67714 6.00488 7.49609H7.99316C8.40728 7.49617 8.7431 7.83198 8.74316 8.24609C8.74314 8.66024 8.4073 8.99602 7.99316 8.99609H3.75C3.336 8.99586 3.001 8.66014 3.00098 8.24609V4.00391C3.00098 3.58984 3.33599 3.25414 3.75 3.25391C4.16419 3.25393 4.5 3.58971 4.5 4.00391V7.02734C6.11191 4.60056 8.86829 3 12 3Z" fill="#010820"/>
                    </svg>
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

      {/* 모바일 메인 컨텐츠 */}
      <div 
        className="lg:hidden flex flex-col" 
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: '72px',
          overflow: 'hidden'
        }}
      >
        {/* 상단: 프리뷰 영역 */}
        <div 
          className="flex items-center justify-center" 
          style={{ 
            padding: '16px 24px 12px 24px',
            flexShrink: 0 
          }}
        >
          <div 
            className="rounded-full flex items-center justify-center"
            style={{
              width: 'min(240px, 60vw)',
              height: 'min(240px, 60vw)',
              backgroundColor: '#F7F9FB',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <CharacterPreview character={character} size={240} />
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div 
          className="mobile-actions-container" 
          style={{ 
            paddingBottom: '12px', 
            paddingLeft: '24px', 
            paddingRight: '24px',
            flexShrink: 0 
          }}
        >
          {/* 좌측/중앙: Surprise Me + Reset 버튼 */}
          <div className="flex items-center" style={{ gap: '10px' }}>
            {/* Surprise Me 버튼 */}
            <button
              onClick={handleRandomize}
              className="surprise-me-btn mobile-surprise-btn rounded-full transition-all duration-300 shadow-md flex items-center justify-center"
              style={{
                height: '44px',
                fontSize: '13px',
                lineHeight: '140%',
                fontWeight: 600,
                backgroundColor: '#FFFFFF',
                border: '1px solid #EDF2F7',
                color: '#010820',
                gap: '6px'
              }}
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-on-hover"
                style={{ width: '18px', height: '18px', transition: 'transform 0.3s ease', flexShrink: 0 }}
              >
                <path d="M10.6045 3.87207C11.1042 2.60696 12.8958 2.60696 13.3955 3.87207L15.0605 8.09668C15.1939 8.43471 15.4452 8.71098 15.7646 8.87695L15.9062 8.94141L20.1299 10.6074C21.3951 11.1072 21.3951 12.8978 20.1299 13.3975L15.9062 15.0635C15.5197 15.2159 15.213 15.5216 15.0605 15.9082L13.3955 20.1318C12.9269 21.3182 11.3229 21.3922 10.7129 20.3535L10.6045 20.1318L8.93945 15.9082C8.78699 15.5216 8.48034 15.2159 8.09375 15.0635L3.87012 13.3975L3.64844 13.29C2.67874 12.7206 2.67874 11.2843 3.64844 10.7148L3.87012 10.6074L8.09375 8.94141C8.43203 8.80799 8.70901 8.55696 8.875 8.2373L8.93945 8.09668L10.6045 3.87207ZM10.334 8.64648C10.029 9.41949 9.41661 10.032 8.64355 10.3369L4.42188 12.002L8.64355 13.668C9.41672 13.9729 10.029 14.5852 10.334 15.3584L12 19.5801L13.666 15.3584C13.971 14.5852 14.5833 13.9729 15.3564 13.668L19.5781 12.002L15.3564 10.3369C14.5834 10.032 13.971 9.41949 13.666 8.64648L12 4.4248L10.334 8.64648Z" fill="#010820"/>
              </svg>
              <span className="surprise-me-text">Surprise Me</span>
            </button>

            {/* Reset 버튼 */}
            <button
              onClick={handleReset}
              className="reset-btn rounded-full transition-all duration-300 shadow-md flex items-center justify-center"
              style={{
                width: '44px',
                height: '44px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #EDF2F7'
              }}
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-on-hover"
                style={{ width: '18px', height: '18px', transition: 'transform 0.3s ease' }}
              >
                <path d="M3.75 11.25C4.16421 11.25 4.5 11.5858 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C14.4515 19.5 16.6268 18.3229 17.9951 16.5039H16.0068C15.5927 16.5038 15.2569 16.168 15.2568 15.7539C15.2569 15.3398 15.5927 15.004 16.0068 15.0039H20.25C20.664 15.0041 20.999 15.3399 20.999 15.7539V19.9961C20.999 20.4102 20.664 20.7459 20.25 20.7461C19.8358 20.7461 19.5 20.4103 19.5 19.9961V16.9727C17.8881 19.3994 15.1317 21 12 21C7.02944 21 3 16.9706 3 12C3 11.5858 3.33579 11.25 3.75 11.25ZM12 3C16.9706 3 21 7.02944 21 12C21 12.4142 20.6642 12.75 20.25 12.75C19.8358 12.75 19.5 12.4142 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.54851 4.5 7.37322 5.67714 6.00488 7.49609H7.99316C8.40728 7.49617 8.7431 7.83198 8.74316 8.24609C8.74314 8.66024 8.4073 8.99602 7.99316 8.99609H3.75C3.336 8.99586 3.001 8.66014 3.00098 8.24609V4.00391C3.00098 3.58984 3.33599 3.25414 3.75 3.25391C4.16419 3.25393 4.5 3.58971 4.5 4.00391V7.02734C6.11191 4.60056 8.86829 3 12 3Z" fill="#010820"/>
              </svg>
            </button>
          </div>

          {/* 우측: Save 버튼 (모바일만) */}
          <button
            onClick={() => {
              // localStorage에 저장 후 save 페이지로 이동
              const currentCharacter = localStorage.getItem('currentCharacter');
              if (currentCharacter) {
                setTimeout(() => {
                  window.location.href = '/save';
                }, 100);
              }
            }}
            className="mobile-save-btn text-white rounded-full transition-all duration-300 shadow-md flex items-center justify-center"
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#010820',
            }}
          >
            <Image
              src="/caret-right.svg"
              alt="Save"
              width={18}
              height={18}
              style={{ width: '18px', height: '18px' }}
            />
          </button>
        </div>

        {/* 하단: 카테고리 메뉴 (화면 너비에 맞게) */}
        <div 
          className="w-full" 
          style={{ 
            paddingLeft: '24px', 
            paddingRight: '24px', 
            paddingBottom: '12px',
            flexShrink: 0 
          }}
        >
          <div className="grid grid-cols-7 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="flex flex-col items-center justify-center rounded-xl transition-all duration-200 mobile-menu-item"
                style={{
                  aspectRatio: '1 / 1',
                  backgroundColor: selectedCategory === category.id ? '#F7F9FB' : '#FFFFFF',
                  border: `1px solid ${selectedCategory === category.id ? '#3B82F6' : '#EDF2F7'}`,
                  boxShadow: selectedCategory === category.id ? '0 1px 8px rgba(59, 130, 246, 0.16)' : '0 1px 2px rgba(48, 58, 75, 0.08)',
                  padding: '6px 4px',
                  minHeight: 0,
                }}
              >
                <Image 
                  src={category.icon}
                  alt={category.label}
                  width={20}
                  height={20}
                  unoptimized
                  style={{ 
                    width: '20px', 
                    height: '20px',
                    opacity: selectedCategory === category.id ? 1 : 0.4,
                    marginBottom: '2px',
                    flexShrink: 0,
                  }}
                />
                <span 
                  className="category-label"
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: selectedCategory === category.id ? '#010820' : '#A0AEC0',
                    textAlign: 'center',
                    lineHeight: '1',
                    wordBreak: 'break-word',
                    flexShrink: 0,
                  }}
                >
                  {category.id === 'accessories' ? 'Acc' : category.label.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 컨트롤 패널 */}
        <div 
          className="mobile-controls-panel"
          style={{
            backgroundColor: '#F7F9FB',
            borderTop: '1px solid #EDF2F7',
            padding: '24px',
            paddingBottom: 'calc(80px + env(safe-area-inset-bottom))',
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            flex: '1 1 auto',
            minHeight: 0,
          }}
        >
          <CustomizeControls 
            character={character} 
            updateCharacter={updateCharacter}
            selectedCategory={selectedCategory}
            isMobile={true}
          />
        </div>
      </div>
    </div>
  );
}

