'use client';

import React, { useState, useEffect } from 'react';
import { CharacterAttributes } from '@/types/character';

interface CharacterPreviewProps {
  character: CharacterAttributes;
  size?: number;
}

export default function CharacterPreview({ character, size = 400 }: CharacterPreviewProps) {
  const { face, hair, eyes, nose, mouth, background } = character;
  const [coloredHairSvg, setColoredHairSvg] = useState<string>('');
  const [coloredEyesSvg, setColoredEyesSvg] = useState<string>('');
  const [coloredLeftEyeSvg, setColoredLeftEyeSvg] = useState<string>('');
  const [coloredRightEyeSvg, setColoredRightEyeSvg] = useState<string>('');

  // Hair SVG 색상 변경 (gradient 지원)
  useEffect(() => {
    let objectUrl = '';
    
    if (hair.hairItemId) {
      fetch(`/hair-item-${hair.hairItemId}.svg`)
        .then(response => response.text())
        .then(svgText => {
          let coloredSvg;
          
          if (hair.color === 'gradient') {
            // Gradient 처리: linearGradient 정의 추가하고 #303A4B를 url(#hairGradient)로 교체
            const gradientDef = `<defs><linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="5.54%" style="stop-color:#FF1313;stop-opacity:1" /><stop offset="34.66%" style="stop-color:#FFCD57;stop-opacity:1" /><stop offset="59.23%" style="stop-color:#89FFAE;stop-opacity:1" /><stop offset="84.25%" style="stop-color:#6392FF;stop-opacity:1" /><stop offset="100%" style="stop-color:#D5CCFF;stop-opacity:1" /></linearGradient></defs>`;
            
            // SVG 태그 뒤에 defs를 삽입
            if (svgText.includes('<svg')) {
              const svgStartIndex = svgText.indexOf('>');
              coloredSvg = svgText.slice(0, svgStartIndex + 1) + gradientDef + svgText.slice(svgStartIndex + 1);
              // #303A4B를 url(#hairGradient)로 교체
              coloredSvg = coloredSvg.replace(/#303A4B/gi, 'url(#hairGradient)');
            } else {
              coloredSvg = svgText;
            }
          } else {
            // 단색 처리
            coloredSvg = svgText.replace(/#303A4B/gi, hair.color);
          }
          
          const blob = new Blob([coloredSvg], { type: 'image/svg+xml' });
          objectUrl = URL.createObjectURL(blob);
          setColoredHairSvg(objectUrl);
        })
        .catch(error => {
          console.error('Failed to load hair SVG:', error);
        });
    } else {
      setColoredHairSvg('');
    }

    // Cleanup
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [hair.hairItemId, hair.color]);

  // Eyes SVG 색상 변경 (gradient 지원)
  useEffect(() => {
    let objectUrl = '';
    let leftObjectUrl = '';
    let rightObjectUrl = '';
    
    if (eyes.eyeItemId) {
      if (eyes.color === 'gradient1') {
        // Gradient1 처리: 왼쪽 눈과 오른쪽 눈을 각각 다른 색상으로 (#36A3FF와 #863517)
        fetch(`/eyes-item-${eyes.eyeItemId}.svg`)
          .then(response => response.text())
          .then(svgText => {
            // 왼쪽 눈: #36A3FF
            const leftSvg = svgText.replace(/#303A4B/gi, '#36A3FF');
            const leftBlob = new Blob([leftSvg], { type: 'image/svg+xml' });
            leftObjectUrl = URL.createObjectURL(leftBlob);
            setColoredLeftEyeSvg(leftObjectUrl);
            
            // 오른쪽 눈: #863517
            const rightSvg = svgText.replace(/#303A4B/gi, '#863517');
            const rightBlob = new Blob([rightSvg], { type: 'image/svg+xml' });
            rightObjectUrl = URL.createObjectURL(rightBlob);
            setColoredRightEyeSvg(rightObjectUrl);
            
            setColoredEyesSvg(''); // 일반 eyes SVG는 사용하지 않음
          })
          .catch(error => {
            console.error('Failed to load eyes SVG:', error);
          });
      } else if (eyes.color === 'gradient2') {
        // Gradient2 처리: 왼쪽 눈과 오른쪽 눈을 각각 다른 색상으로 (#53BD00와 #814813)
        fetch(`/eyes-item-${eyes.eyeItemId}.svg`)
          .then(response => response.text())
          .then(svgText => {
            // 왼쪽 눈: #53BD00
            const leftSvg = svgText.replace(/#303A4B/gi, '#53BD00');
            const leftBlob = new Blob([leftSvg], { type: 'image/svg+xml' });
            leftObjectUrl = URL.createObjectURL(leftBlob);
            setColoredLeftEyeSvg(leftObjectUrl);
            
            // 오른쪽 눈: #814813
            const rightSvg = svgText.replace(/#303A4B/gi, '#814813');
            const rightBlob = new Blob([rightSvg], { type: 'image/svg+xml' });
            rightObjectUrl = URL.createObjectURL(rightBlob);
            setColoredRightEyeSvg(rightObjectUrl);
            
            setColoredEyesSvg(''); // 일반 eyes SVG는 사용하지 않음
          })
          .catch(error => {
            console.error('Failed to load eyes SVG:', error);
          });
      } else {
        // 단색 처리
        fetch(`/eyes-item-${eyes.eyeItemId}.svg`)
          .then(response => response.text())
          .then(svgText => {
            const coloredSvg = svgText.replace(/#303A4B/gi, eyes.color);
            const blob = new Blob([coloredSvg], { type: 'image/svg+xml' });
            objectUrl = URL.createObjectURL(blob);
            setColoredEyesSvg(objectUrl);
            
            setColoredLeftEyeSvg('');
            setColoredRightEyeSvg('');
          })
          .catch(error => {
            console.error('Failed to load eyes SVG:', error);
          });
      }
    } else {
      setColoredEyesSvg('');
      setColoredLeftEyeSvg('');
      setColoredRightEyeSvg('');
    }

    // Cleanup
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      if (leftObjectUrl) URL.revokeObjectURL(leftObjectUrl);
      if (rightObjectUrl) URL.revokeObjectURL(rightObjectUrl);
    };
  }, [eyes.eyeItemId, eyes.color]);

  // 아이템 이미지 렌더링 헬퍼 함수 (128px → 384px, 3배 확대)
  const renderItemImage = (itemPath: string) => {
    return (
      <image
        href={itemPath}
        x="8"
        y="8"
        width="384"
        height="384"
        preserveAspectRatio="xMidYMid meet"
      />
    );
  };

  // Layer 1: Skin Tone (가장 하단) - 가운데 정렬
  const renderSkinTone = () => {
    if (face.skinToneItemId) {
      const baseSize = 384;
      const centerX = 200; // SVG viewBox 중앙 (400/2)
      const centerY = 200; // SVG viewBox 중앙 (400/2)
      const adjustedX = centerX - baseSize / 2;
      const adjustedY = centerY - baseSize / 2;
      
      return (
        <image
          href={`/skin-tone-item-${face.skinToneItemId}.svg`}
          x={adjustedX}
          y={adjustedY}
          width={baseSize}
          height={baseSize}
          preserveAspectRatio="xMidYMid meet"
        />
      );
    }
    return null;
  };

  // Layer 2: Eyes - 가운데 정렬, 색상 변경 가능 (#303A4B -> 선택된 색상) 또는 gradient
  const renderEyesItem = () => {
    if (eyes.eyeItemId) {
      const baseSize = 384;
      const centerX = 200; // SVG viewBox 중앙 (400/2)
      const centerY = 200; // SVG viewBox 중앙 (400/2)
      const adjustedX = centerX - baseSize / 2;
      const adjustedY = centerY - baseSize / 2;
      
      // spacing 적용: 왼쪽 눈은 -spacing, 오른쪽 눈은 +spacing
      const leftEyeX = adjustedX - eyes.spacing;
      const rightEyeX = adjustedX + eyes.spacing;
      
      if ((eyes.color === 'gradient1' || eyes.color === 'gradient2') && coloredLeftEyeSvg && coloredRightEyeSvg) {
        // Gradient: 왼쪽 눈과 오른쪽 눈을 각각 다른 색상으로
        return (
          <>
            {/* 왼쪽 눈 - 왼쪽 절반만 보이게 */}
            <g clipPath="url(#leftEyeClip)">
              <image
                href={coloredLeftEyeSvg}
                x={leftEyeX}
                y={adjustedY}
                width={baseSize}
                height={baseSize}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
            {/* 오른쪽 눈 - 오른쪽 절반만 보이게 */}
            <g clipPath="url(#rightEyeClip)">
              <image
                href={coloredRightEyeSvg}
                x={rightEyeX}
                y={adjustedY}
                width={baseSize}
                height={baseSize}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          </>
        );
      } else if (coloredEyesSvg) {
        // 단색: 왼쪽 눈과 오른쪽 눈을 클립으로 분리해서 spacing 적용
        return (
          <>
            {/* 왼쪽 눈 - 왼쪽 절반만 보이게 */}
            <g clipPath="url(#leftEyeClip)">
              <image
                href={coloredEyesSvg}
                x={leftEyeX}
                y={adjustedY}
                width={baseSize}
                height={baseSize}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
            {/* 오른쪽 눈 - 오른쪽 절반만 보이게 */}
            <g clipPath="url(#rightEyeClip)">
              <image
                href={coloredEyesSvg}
                x={rightEyeX}
                y={adjustedY}
                width={baseSize}
                height={baseSize}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          </>
        );
      }
    }
    return null;
  };

  // Layer 3: Nose - 가운데 정렬, y축만 이동, size 조절 가능 (기본값 1.0)
  const renderNoseItem = () => {
    if (nose.noseItemId) {
      const baseSize = 384;
      const scaledSize = baseSize * nose.size; // size 조절 가능
      const centerX = 200; // SVG viewBox 중앙 (400/2)
      const centerY = 200; // SVG viewBox 중앙 (400/2)
      // 가운데 정렬 (이미지 크기의 절반을 빼서 중앙 배치)
      const adjustedX = centerX - scaledSize / 2;
      const adjustedY = centerY - scaledSize / 2 + nose.position.y; // y축만 적용
      
      return (
        <image
          href={`/nose-item-${nose.noseItemId}.svg`}
          x={adjustedX}
          y={adjustedY}
          width={scaledSize}
          height={scaledSize}
          preserveAspectRatio="xMidYMid meet"
        />
      );
    }
    return null;
  };

  // Layer 4: Mouth - 가운데 정렬, size, position 적용 (기본값 1.0)
  const renderMouthItem = () => {
    if (mouth.mouthItemId) {
      const baseSize = 384;
      const scaledSize = baseSize * mouth.size;
      const centerX = 200; // SVG viewBox 중앙 (400/2)
      const centerY = 200; // SVG viewBox 중앙 (400/2)
      const adjustedX = centerX - scaledSize / 2 + (mouth.position?.x || 0);
      const adjustedY = centerY - scaledSize / 2 + (mouth.position?.y || 0);
      
      return (
        <image
          href={`/mouth-item-${mouth.mouthItemId}.svg`}
          x={adjustedX}
          y={adjustedY}
          width={scaledSize}
          height={scaledSize}
          preserveAspectRatio="xMidYMid meet"
        />
      );
    }
    return null;
  };

  // Layer 5: Hair - 가운데 정렬, 색상 변경 가능 (#303A4B -> 선택된 색상)
  const renderHairItem = () => {
    if (hair.hairItemId && coloredHairSvg) {
      const baseSize = 384;
      const centerX = 200;
      const centerY = 200;
      const adjustedX = centerX - baseSize / 2;
      const adjustedY = centerY - baseSize / 2;
      
      return (
        <image
          href={coloredHairSvg}
          x={adjustedX}
          y={adjustedY}
          width={baseSize}
          height={baseSize}
          preserveAspectRatio="xMidYMid meet"
        />
      );
    }
    return null;
  };

  // Layer 6: Features - 가운데 정렬
  const renderFeaturesItem = () => {
    if (character.features?.featureItemId) {
      const baseSize = 384;
      const centerX = 200;
      const centerY = 200;
      const adjustedX = centerX - baseSize / 2;
      const adjustedY = centerY - baseSize / 2;
      
      return (
        <image
          href={`/features-item-${character.features.featureItemId}.svg`}
          x={adjustedX}
          y={adjustedY}
          width={baseSize}
          height={baseSize}
          preserveAspectRatio="xMidYMid meet"
        />
      );
    }
    return null;
  };

  // Layer 7: Accessories - 가운데 정렬 (Single-select by category, 각 카테고리별 Y Position 조절)
  const renderAccessoriesItem = () => {
    const baseSize = 384;
    const centerX = 200;
    const centerY = 200;
    
    const allAccessories = [];
    
    // Headwear
    if (character.accessories?.headwear?.itemId) {
      const adjustedX = centerX - baseSize / 2;
      const adjustedY = centerY - baseSize / 2 + (character.accessories.headwear.position?.y || 0);
      
      allAccessories.push(
        <image
          key="headwear"
          href={`/headwear-item-${character.accessories.headwear.itemId}.svg`}
          x={adjustedX}
          y={adjustedY}
          width={baseSize}
          height={baseSize}
          preserveAspectRatio="xMidYMid meet"
        />
      );
    }
    
    // Eyewear
    if (character.accessories?.eyewear?.itemId) {
      const adjustedX = centerX - baseSize / 2;
      const adjustedY = centerY - baseSize / 2 + (character.accessories.eyewear.position?.y || 0);
      
      allAccessories.push(
        <image
          key="eyewear"
          href={`/eyewear-item-${character.accessories.eyewear.itemId}.svg`}
          x={adjustedX}
          y={adjustedY}
          width={baseSize}
          height={baseSize}
          preserveAspectRatio="xMidYMid meet"
        />
      );
    }
    
    // Piercings
    if (character.accessories?.piercings?.itemId) {
      const adjustedX = centerX - baseSize / 2;
      const adjustedY = centerY - baseSize / 2 + (character.accessories.piercings.position?.y || 0);
      
      allAccessories.push(
        <image
          key="piercings"
          href={`/piercings-item-${character.accessories.piercings.itemId}.svg`}
          x={adjustedX}
          y={adjustedY}
          width={baseSize}
          height={baseSize}
          preserveAspectRatio="xMidYMid meet"
        />
      );
    }
    
    return allAccessories.length > 0 ? <>{allAccessories}</> : null;
  };

  // Background 렌더링
  const renderBackground = () => {
    if (background.type === 'solid') {
      return <rect width="100%" height="100%" fill={background.color} />;
    } else if (background.type === 'gradient') {
      return (
        <>
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={background.color} />
              <stop offset="100%" stopColor={background.secondaryColor || background.color} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bgGradient)" />
        </>
      );
    } else {
      // pattern
      return (
        <>
          <defs>
            <pattern id="bgPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="5" fill={background.color} />
              <circle cx="30" cy="30" r="5" fill={background.secondaryColor || background.color} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bgPattern)" />
        </>
      );
    }
  };

  // Face 렌더링
  const renderFace = () => {
    let path = '';
    const centerX = 200;
    const centerY = 220;
    
    switch (face.style) {
      case 'round':
        return <circle cx={centerX} cy={centerY} r="120" fill={face.color} />;
      case 'oval':
        return <ellipse cx={centerX} cy={centerY} rx="100" ry="130" fill={face.color} />;
      case 'square':
        return <rect x="80" y="90" width="240" height="260" rx="20" fill={face.color} />;
      case 'heart':
        path = `M 200,100 Q 250,80 280,120 Q 290,160 200,280 Q 110,160 120,120 Q 150,80 200,100 Z`;
        return <path d={path} fill={face.color} />;
      default:
        return <circle cx={centerX} cy={centerY} r="120" fill={face.color} />;
    }
  };

  // Hair 렌더링
  const renderHair = () => {
    const centerX = 200;
    const centerY = 150;
    
    switch (hair.style) {
      case 'short':
        return (
          <path
            d={`M 100,${centerY} Q 100,80 200,70 Q 300,80 300,${centerY} L 280,${centerY} Q 280,100 200,95 Q 120,100 120,${centerY} Z`}
            fill={hair.color}
          />
        );
      case 'long':
        return (
          <path
            d={`M 80,${centerY} Q 80,60 200,50 Q 320,60 320,${centerY} L 320,300 Q 260,310 200,300 Q 140,310 80,300 Z`}
            fill={hair.color}
          />
        );
      case 'curly':
        return (
          <>
            <circle cx="120" cy="120" r="40" fill={hair.color} />
            <circle cx="200" cy="100" r="45" fill={hair.color} />
            <circle cx="280" cy="120" r="40" fill={hair.color} />
            <circle cx="150" cy="140" r="35" fill={hair.color} />
            <circle cx="250" cy="140" r="35" fill={hair.color} />
          </>
        );
      case 'ponytail':
        return (
          <>
            <path
              d={`M 100,${centerY} Q 100,80 200,70 Q 300,80 300,${centerY} L 280,${centerY} Q 280,100 200,95 Q 120,100 120,${centerY} Z`}
              fill={hair.color}
            />
            <ellipse cx="200" cy="120" rx="30" ry="60" fill={hair.color} />
          </>
        );
      case 'bald':
        return null;
      default:
        return null;
    }
  };

  // Eyes 렌더링
  const renderEyes = () => {
    const baseSpacing = 60 * eyes.spacing;
    const leftEyeX = 200 - baseSpacing / 2;
    const rightEyeX = 200 + baseSpacing / 2;
    const eyeY = 200;
    const eyeSize = 15 * eyes.size;

    const renderSingleEye = (x: number, rotation: number) => {
      switch (eyes.style) {
        case 'normal':
          return <circle cx={x} cy={eyeY} r={eyeSize} fill={eyes.color} />;
        case 'happy':
          return (
            <path
              d={`M ${x - eyeSize},${eyeY} Q ${x},${eyeY + 10} ${x + eyeSize},${eyeY}`}
              stroke={eyes.color}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          );
        case 'surprised':
          return <circle cx={x} cy={eyeY} r={eyeSize * 1.3} fill={eyes.color} />;
        case 'sleepy':
          return (
            <path
              d={`M ${x - eyeSize},${eyeY} L ${x + eyeSize},${eyeY}`}
              stroke={eyes.color}
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        case 'wink':
          return x < 200 ? (
            <path
              d={`M ${x - eyeSize},${eyeY} L ${x + eyeSize},${eyeY}`}
              stroke={eyes.color}
              strokeWidth="3"
              strokeLinecap="round"
            />
          ) : (
            <circle cx={x} cy={eyeY} r={eyeSize} fill={eyes.color} />
          );
        default:
          return <circle cx={x} cy={eyeY} r={eyeSize} fill={eyes.color} />;
      }
    };

    return (
      <g transform={`rotate(${eyes.rotation}, 200, 200)`}>
        {renderSingleEye(leftEyeX, eyes.rotation)}
        {renderSingleEye(rightEyeX, eyes.rotation)}
      </g>
    );
  };

  // Nose 렌더링
  const renderNose = () => {
    const centerX = 200 + nose.position.x;
    const centerY = 240 + nose.position.y;
    const baseSize = 8 * nose.size;

    switch (nose.style) {
      case 'small':
        return <circle cx={centerX} cy={centerY} r={baseSize * 0.7} fill="#D4A574" />;
      case 'medium':
        return (
          <path
            d={`M ${centerX},${centerY - baseSize} L ${centerX - baseSize},${centerY + baseSize} L ${centerX + baseSize},${centerY + baseSize} Z`}
            fill="#D4A574"
          />
        );
      case 'large':
        return (
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={baseSize * 1.2}
            ry={baseSize * 1.5}
            fill="#D4A574"
          />
        );
      default:
        return null;
    }
  };

  // Mouth 렌더링
  const renderMouth = () => {
    const centerX = 200;
    const centerY = 280;
    const mouthWidth = 40 * mouth.size;

    switch (mouth.style) {
      case 'smile':
        return (
          <path
            d={`M ${centerX - mouthWidth},${centerY} Q ${centerX},${centerY + 20} ${centerX + mouthWidth},${centerY}`}
            stroke="#333"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'neutral':
        return (
          <line
            x1={centerX - mouthWidth}
            y1={centerY}
            x2={centerX + mouthWidth}
            y2={centerY}
            stroke="#333"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      case 'laugh':
        return (
          <>
            <path
              d={`M ${centerX - mouthWidth},${centerY} Q ${centerX},${centerY + 25} ${centerX + mouthWidth},${centerY}`}
              stroke="#333"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M ${centerX - mouthWidth + 5},${centerY + 5} Q ${centerX},${centerY + 20} ${centerX + mouthWidth - 5},${centerY + 5}`}
              fill="white"
            />
          </>
        );
      case 'sad':
        return (
          <path
            d={`M ${centerX - mouthWidth},${centerY} Q ${centerX},${centerY - 15} ${centerX + mouthWidth},${centerY}`}
            stroke="#333"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
      case 'surprise':
        return <circle cx={centerX} cy={centerY} r={mouthWidth / 2} fill="#333" />;
      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="character-preview"
      style={{ overflow: 'hidden' }}
    >
      <defs>
        <clipPath id="preview-clip">
          <circle cx="200" cy="200" r="200" />
        </clipPath>
        {/* Eyes half-half용 clipPath */}
        <clipPath id="leftEyeClip">
          <rect x="0" y="0" width="200" height="400" />
        </clipPath>
        <clipPath id="rightEyeClip">
          <rect x="200" y="0" width="200" height="400" />
        </clipPath>
      </defs>
      
      <g clipPath="url(#preview-clip)">
        {/* 레이어 순서 (아래에서 위로) */}
        {/* Layer 1: Skin Tone - 가장 하단 */}
        {renderSkinTone()}
        
        {/* Layer 2: Eyes */}
        {renderEyesItem()}
        
        {/* Layer 3: Nose */}
        {renderNoseItem()}
        
        {/* Layer 4: Mouth */}
        {renderMouthItem()}
        
        {/* Layer 5: Hair */}
        {renderHairItem()}
        
        {/* Layer 6: Features */}
        {renderFeaturesItem()}
        
        {/* Layer 7: Accessories - 가장 상단 */}
        {renderAccessoriesItem()}
      </g>
    </svg>
  );
}

