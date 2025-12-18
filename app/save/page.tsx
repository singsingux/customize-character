'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import CharacterPreview from '@/components/CharacterPreview';
import { CharacterAttributes } from '@/types/character';
import { DEFAULT_CHARACTER } from '@/lib/constants';
import Image from 'next/image';

// 배경색 옵션
const BACKGROUND_COLORS = [
  '#FFFFFF', // 흰색
  '#C8362E', // 빨강
  '#4D7FDB', // 파랑
  '#FFD93C', // 노랑
  '#57A15B', // 초록
  '#000000', // 검정
];

// 패턴 옵션
const BACKGROUND_PATTERNS = [
  { id: 'pattern1', name: 'Pattern 1', image: '/pattern-item-1.png' },
  { id: 'pattern2', name: 'Pattern 2', image: '/pattern-item-2.png' },
  { id: 'pattern3', name: 'Pattern 3', image: '/pattern-item-3.png' },
];

function SavePageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [character, setCharacter] = useState<CharacterAttributes>(DEFAULT_CHARACTER);
  const [selectedBackground, setSelectedBackground] = useState<string>('#FFFFFF');
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // localStorage에서 캐릭터 데이터 가져오기
    const savedCharacter = localStorage.getItem('currentCharacter');
    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
    }

    // 화면 크기 감지
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 680);
      setIsTablet(window.innerWidth >= 681 && window.innerWidth <= 1023);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.save-hamburger-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleNavigation = (path: string) => {
    if (pathname === path) return;
    router.push(path);
  };

  const handleGoBack = () => {
    // 현재 캐릭터 상태를 localStorage에 저장하고 돌아가기
    localStorage.setItem('currentCharacter', JSON.stringify(character));
    window.location.href = '/customize';
  };

  const handleDownload = async () => {
    try {
      const canvas = document.createElement('canvas');
      const size = 1024;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        alert('Canvas를 생성할 수 없습니다.');
        return;
      }

      console.log('Starting download...');

      // Helper function to load image
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed: ${src}`));
          img.src = src;
        });
      };

      // Helper function to load and color SVG
      const loadColoredSvg = async (src: string, color: string): Promise<string> => {
        const response = await fetch(src);
        const svgText = await response.text();
        
        if (color === 'gradient') {
          // Hair gradient 처리
          const gradientDef = `<defs><linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="5.54%" style="stop-color:#FF1313;stop-opacity:1" /><stop offset="34.66%" style="stop-color:#FFCD57;stop-opacity:1" /><stop offset="59.23%" style="stop-color:#89FFAE;stop-opacity:1" /><stop offset="84.25%" style="stop-color:#6392FF;stop-opacity:1" /><stop offset="100%" style="stop-color:#D5CCFF;stop-opacity:1" /></linearGradient></defs>`;
          
          if (svgText.includes('<svg')) {
            const svgStartIndex = svgText.indexOf('>');
            const coloredSvg = svgText.slice(0, svgStartIndex + 1) + gradientDef + svgText.slice(svgStartIndex + 1);
            return coloredSvg.replace(/#303A4B/gi, 'url(#hairGradient)');
          }
        }
        
        // 단색 처리
        return svgText.replace(/#303A4B/gi, color);
      };

      // Helper function to create data URL from SVG text
      const svgToDataUrl = (svgText: string): string => {
        const blob = new Blob([svgText], { type: 'image/svg+xml' });
        return URL.createObjectURL(blob);
      };

      // 원형 클리핑
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();

      // 1. 배경
      if (selectedPattern) {
        try {
          const patternData = BACKGROUND_PATTERNS.find(p => p.id === selectedPattern);
          if (patternData?.image) {
            const patternImg = await loadImage(patternData.image);
            ctx.drawImage(patternImg, 0, 0, size, size);
          }
        } catch (error) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, size, size);
        }
      } else {
        ctx.fillStyle = selectedBackground;
        ctx.fillRect(0, 0, size, size);
      }

      // 2. 캐릭터 각 부분을 올바른 레이어 순서로 그리기
      const scale = size / 400;
      const center = size / 2;
      const baseSize = 384 * scale;

      // Layer 1: Skin
      if (character.face.skinToneItemId) {
        try {
          const img = await loadImage(`/skin-tone-item-${character.face.skinToneItemId}.svg`);
          ctx.drawImage(img, center - baseSize / 2, center - baseSize / 2, baseSize, baseSize);
          console.log('Drew: skin');
        } catch (error) {
          console.error('Failed: skin', error);
        }
      }

      // Layer 2: Eyes - 색상 및 spacing 적용
      if (character.eyes.eyeItemId) {
        try {
          const eyesSrc = `/eyes-item-${character.eyes.eyeItemId}.svg`;
          const eyesSpacing = character.eyes.spacing * scale;
          
          if (character.eyes.color === 'gradient1') {
            // Gradient1: 왼쪽 #36A3FF, 오른쪽 #863517
            const leftEyesSvg = await loadColoredSvg(eyesSrc, '#36A3FF');
            const rightEyesSvg = await loadColoredSvg(eyesSrc, '#863517');
            
            const leftDataUrl = svgToDataUrl(leftEyesSvg);
            const rightDataUrl = svgToDataUrl(rightEyesSvg);
            
            const leftImg = await loadImage(leftDataUrl);
            const rightImg = await loadImage(rightDataUrl);
            
            // 왼쪽 눈 (왼쪽 절반만)
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, center, size);
            ctx.clip();
            ctx.drawImage(leftImg, center - baseSize / 2 - eyesSpacing, center - baseSize / 2, baseSize, baseSize);
            ctx.restore();
            
            // 오른쪽 눈 (오른쪽 절반만)
            ctx.save();
            ctx.beginPath();
            ctx.rect(center, 0, center, size);
            ctx.clip();
            ctx.drawImage(rightImg, center - baseSize / 2 + eyesSpacing, center - baseSize / 2, baseSize, baseSize);
            ctx.restore();
            
            URL.revokeObjectURL(leftDataUrl);
            URL.revokeObjectURL(rightDataUrl);
          } else if (character.eyes.color === 'gradient2') {
            // Gradient2: 왼쪽 #53BD00, 오른쪽 #814813
            const leftEyesSvg = await loadColoredSvg(eyesSrc, '#53BD00');
            const rightEyesSvg = await loadColoredSvg(eyesSrc, '#814813');
            
            const leftDataUrl = svgToDataUrl(leftEyesSvg);
            const rightDataUrl = svgToDataUrl(rightEyesSvg);
            
            const leftImg = await loadImage(leftDataUrl);
            const rightImg = await loadImage(rightDataUrl);
            
            // 왼쪽 눈 (왼쪽 절반만)
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, center, size);
            ctx.clip();
            ctx.drawImage(leftImg, center - baseSize / 2 - eyesSpacing, center - baseSize / 2, baseSize, baseSize);
            ctx.restore();
            
            // 오른쪽 눈 (오른쪽 절반만)
            ctx.save();
            ctx.beginPath();
            ctx.rect(center, 0, center, size);
            ctx.clip();
            ctx.drawImage(rightImg, center - baseSize / 2 + eyesSpacing, center - baseSize / 2, baseSize, baseSize);
            ctx.restore();
            
            URL.revokeObjectURL(leftDataUrl);
            URL.revokeObjectURL(rightDataUrl);
          } else {
            // 단색 - spacing 적용 (왼쪽과 오른쪽을 각각 클립해서 그리기)
            const coloredEyesSvg = await loadColoredSvg(eyesSrc, character.eyes.color);
            const dataUrl = svgToDataUrl(coloredEyesSvg);
            const img = await loadImage(dataUrl);
            
            // 왼쪽 눈 (왼쪽 절반만)
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, center, size);
            ctx.clip();
            ctx.drawImage(img, center - baseSize / 2 - eyesSpacing, center - baseSize / 2, baseSize, baseSize);
            ctx.restore();
            
            // 오른쪽 눈 (오른쪽 절반만)
            ctx.save();
            ctx.beginPath();
            ctx.rect(center, 0, center, size);
            ctx.clip();
            ctx.drawImage(img, center - baseSize / 2 + eyesSpacing, center - baseSize / 2, baseSize, baseSize);
            ctx.restore();
            
            URL.revokeObjectURL(dataUrl);
          }
          console.log('Drew: eyes with color', character.eyes.color, 'spacing:', character.eyes.spacing);
        } catch (error) {
          console.error('Failed: eyes', error);
        }
      }

      // Layer 3: Nose
      if (character.nose.noseItemId) {
        try {
          const noseSize = baseSize * character.nose.size;
          const noseX = center - noseSize / 2 + (character.nose.position.x * scale);
          const noseY = center - noseSize / 2 + (character.nose.position.y * scale);
          const img = await loadImage(`/nose-item-${character.nose.noseItemId}.svg`);
          ctx.drawImage(img, noseX, noseY, noseSize, noseSize);
          console.log('Drew: nose');
        } catch (error) {
          console.error('Failed: nose', error);
        }
      }

      // Layer 4: Mouth
      if (character.mouth.mouthItemId && character.mouth.position) {
        try {
          const mouthSize = baseSize * character.mouth.size;
          const mouthX = center - mouthSize / 2 + (character.mouth.position.x * scale);
          const mouthY = center - mouthSize / 2 + (character.mouth.position.y * scale);
          const img = await loadImage(`/mouth-item-${character.mouth.mouthItemId}.svg`);
          ctx.drawImage(img, mouthX, mouthY, mouthSize, mouthSize);
          console.log('Drew: mouth');
        } catch (error) {
          console.error('Failed: mouth', error);
        }
      }

      // Layer 5: Features
      if (character.features?.featureItemId) {
        try {
          const img = await loadImage(`/features-item-${character.features.featureItemId}.svg`);
          ctx.drawImage(img, center - baseSize / 2, center - baseSize / 2, baseSize, baseSize);
          console.log('Drew: features');
        } catch (error) {
          console.error('Failed: features', error);
        }
      }

      // Layer 6: Hair - 색상 적용
      if (character.hair.hairItemId) {
        try {
          const hairSrc = `/hair-item-${character.hair.hairItemId}.svg`;
          const coloredHairSvg = await loadColoredSvg(hairSrc, character.hair.color);
          const dataUrl = svgToDataUrl(coloredHairSvg);
          const img = await loadImage(dataUrl);
          
          ctx.drawImage(img, center - baseSize / 2, center - baseSize / 2, baseSize, baseSize);
          
          URL.revokeObjectURL(dataUrl);
          console.log('Drew: hair with color', character.hair.color);
        } catch (error) {
          console.error('Failed: hair', error);
        }
      }

      // Layer 7: Accessories
      if (character.accessories.headwear.itemId) {
        try {
          const y = center - baseSize / 2 + (character.accessories.headwear.position.y * scale);
          const img = await loadImage(`/headwear-item-${character.accessories.headwear.itemId}.svg`);
          ctx.drawImage(img, center - baseSize / 2, y, baseSize, baseSize);
          console.log('Drew: headwear');
        } catch (error) {
          console.error('Failed: headwear', error);
        }
      }
      if (character.accessories.eyewear.itemId) {
        try {
          const y = center - baseSize / 2 + (character.accessories.eyewear.position.y * scale);
          const img = await loadImage(`/eyewear-item-${character.accessories.eyewear.itemId}.svg`);
          ctx.drawImage(img, center - baseSize / 2, y, baseSize, baseSize);
          console.log('Drew: eyewear');
        } catch (error) {
          console.error('Failed: eyewear', error);
        }
      }
      if (character.accessories.piercings.itemId) {
        try {
          const y = center - baseSize / 2 + (character.accessories.piercings.position.y * scale);
          const img = await loadImage(`/piercings-item-${character.accessories.piercings.itemId}.svg`);
          ctx.drawImage(img, center - baseSize / 2, y, baseSize, baseSize);
          console.log('Drew: piercings');
        } catch (error) {
          console.error('Failed: piercings', error);
        }
      }

      ctx.restore();

      // 3. PNG로 다운로드
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          link.href = url;
          link.download = `REDROB_avatar_${timestamp}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          console.log('Downloaded!');
        } else {
          alert('PNG 생성에 실패했습니다.');
        }
      }, 'image/png');
    } catch (error) {
      console.error('Download failed:', error);
      alert(`다운로드 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  };

  return (
    <div
      className="fade-in"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 상단 네비게이션 */}
      <div 
        className="save-hamburger-menu"
        style={{
          position: 'fixed',
          left: '24px',
          right: '24px',
          top: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 50,
        }}
      >
        {/* 좌측: Edit 버튼 */}
        <button
          onClick={handleGoBack}
          className="save-edit-btn"
          style={{
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #EDF2F7',
            borderRadius: '100px',
            fontWeight: 600,
            fontSize: '14px',
            color: '#010820',
            cursor: 'pointer',
            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
            transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.6, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F7F9FB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
          }}
        >
          <Image
            src="/caret-left.svg"
            alt="back"
            width={24}
            height={24}
            className="edit-icon"
            style={{ width: '20px', height: '20px' }}
          />
          <span className="edit-text">Edit</span>
        </button>

        {/* 우측: 햄버거 메뉴 (모바일만) - 숨김 처리 */}
        {false && isSmallScreen && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full flex items-center justify-center"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #EDF2F7',
                boxShadow: '0 1px 8px rgba(48, 58, 75, 0.08)',
                height: '48px',
                width: '48px',
                cursor: 'pointer'
              }}
            >
              <Image
                src="/menu-line.svg"
                alt="Menu"
                width={24}
                height={24}
                style={{ width: '24px', height: '24px' }}
              />
            </button>

            {/* 드롭다운 메뉴 */}
            {isMenuOpen && (
              <div 
                className="mt-2 rounded-2xl"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EDF2F7',
                  boxShadow: '0 4px 16px rgba(48, 58, 75, 0.12)',
                  overflow: 'hidden',
                  minWidth: '200px'
                }}
              >
                <button
                  onClick={() => {
                    handleNavigation('/');
                    setIsMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: pathname === '/' ? '#010820' : '#A0AEC0',
                    backgroundColor: pathname === '/' ? '#F7F9FB' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderBottom: '1px solid #EDF2F7'
                  }}
                >
                  Main
                </button>
                <button
                  onClick={() => {
                    handleNavigation('/customize');
                    setIsMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: pathname === '/customize' ? '#010820' : '#A0AEC0',
                    backgroundColor: pathname === '/customize' ? '#F7F9FB' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderBottom: '1px solid #EDF2F7'
                  }}
                >
                  Create
                </button>
                <div
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#CBD5E0',
                    cursor: 'not-allowed',
                    textAlign: 'left'
                  }}
                >
                  Gallery <span style={{ fontSize: '12px', marginLeft: '8px' }}>(In progress...)</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 중앙 컨테이너 */}
      <div
        className="save-main-container"
        style={{
          maxWidth: '680px',
          backgroundColor: '#F7F9FB',
          border: '1px solid #EDF2F7',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '24px',
          right: '24px',
          transform: 'translateY(-50%)',
        }}
      >
        {/* 타이틀 */}
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#010820',
            marginBottom: '32px',
          }}
        >
          You look so cool 👀
        </h1>

        {/* 캐릭터 프리뷰 */}
        <div
          ref={previewRef}
          className="save-preview-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            position: 'relative',
          }}
        >
          {/* 배경 레이어 - 클리핑 마스크 적용 */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
            }}
            viewBox="0 0 300 300"
          >
            <defs>
              <clipPath id="background-clip">
                <circle cx="150" cy="150" r="150" />
              </clipPath>
            </defs>
            <g clipPath="url(#background-clip)">
              {/* 배경색 또는 패턴 */}
              {selectedPattern ? (
                <image
                  href={BACKGROUND_PATTERNS.find(p => p.id === selectedPattern)?.image || ''}
                  x="0"
                  y="0"
                  width="300"
                  height="300"
                  preserveAspectRatio="xMidYMid slice"
                />
              ) : (
                <circle cx="150" cy="150" r="150" fill={selectedBackground} />
              )}
            </g>
          </svg>
          
          {/* 캐릭터 레이어 */}
          <div 
            className="save-character-layer"
            style={{ 
              position: 'relative', 
              zIndex: 1, 
              width: '100%',
              height: '100%',
              overflow: 'hidden', 
              borderRadius: '50%' 
            }}
          >
            <CharacterPreview 
              character={character} 
              size={isSmallScreen ? 220 : isTablet ? 260 : 300} 
            />
          </div>
          
          {/* 프레임 레이어 */}
          <Image
            src="/final-preview.svg"
            alt="preview frame"
            width={300}
            height={300}
            className="save-preview-frame"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        </div>

        {/* 배경색 & 패턴 선택 - 모바일에서 합쳐짐 */}
        <div className="save-swatches-wrapper" style={{ width: '100%', marginBottom: '32px' }}>
          {/* 배경색 선택 */}
          <div className="save-swatches-section">
            <div
              className="save-bg-swatches save-color-swatches"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {BACKGROUND_COLORS.map((color) => {
                const isSelected = selectedBackground === color && !selectedPattern;
                return (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedBackground(color);
                      setSelectedPattern(null);
                    }}
                    className="save-swatch-btn"
                    style={{
                      padding: 0,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    {/* 컬러 원형 */}
                    <div
                      className="save-swatch-circle"
                      style={{
                        position: 'absolute',
                        borderRadius: '50%',
                        backgroundColor: color,
                        zIndex: 1,
                      }}
                    />
                    {/* 프레임 */}
                    <Image
                      src={isSelected ? '/bg-frame-selected.svg' : '/bg-frame-default.svg'}
                      alt="frame"
                      width={80}
                      height={80}
                      className="save-swatch-frame"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        pointerEvents: 'none',
                        zIndex: 2,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 패턴 선택 */}
          <div className="save-swatches-section">
            <div
              className="save-bg-swatches save-pattern-swatches"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
            {BACKGROUND_PATTERNS.map((pattern, index) => {
              const isSelected = selectedPattern === pattern.id;
              return (
                <button
                  key={pattern.id}
                  onClick={() => {
                    setSelectedPattern(pattern.id);
                  }}
                  className="save-swatch-btn"
                  style={{
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {/* 프레임 */}
                  <Image
                    src={isSelected ? '/bg-frame-selected.svg' : '/bg-frame-default.svg'}
                    alt="frame"
                    width={80}
                    height={80}
                    className="save-swatch-frame"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      pointerEvents: 'none',
                      zIndex: 2,
                    }}
                  />
                  {/* 패턴 이미지 */}
                  <Image
                    src={pattern.image}
                    alt={pattern.name}
                    width={60}
                    height={60}
                    className="save-swatch-circle"
                    style={{
                      position: 'absolute',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      zIndex: 1,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

        {/* 하단 버튼들 */}
        <div
          className="save-buttons-container"
          style={{
            display: 'flex',
            gap: '12px',
            width: '100%',
          }}
        >
          {/* 새로 만들기 버튼 */}
          <button
            onClick={() => {
              // 새로운 캐릭터로 시작 (localStorage 클리어)
              localStorage.removeItem('currentCharacter');
              window.location.href = '/customize';
            }}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EDF2F7',
              borderRadius: '100px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#010820',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F7F9FB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <Image
              src="/Plus.svg"
              alt="plus"
              width={20}
              height={20}
              style={{ width: '20px', height: '20px' }}
            />
            Create New
          </button>

          {/* PNG로 내보내기 버튼 */}
          <button
            onClick={handleDownload}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#010820',
              border: 'none',
              borderRadius: '100px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1f35';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#010820';
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SavePage() {
  return (
    <Suspense fallback={
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        fontSize: '16px',
        color: '#718096'
      }}>
        Loading...
      </div>
    }>
      <SavePageContent />
    </Suspense>
  );
}

