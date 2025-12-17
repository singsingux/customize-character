'use client';

import { useState } from 'react';
import Image from 'next/image';
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
} from '@/lib/constants';

type Category = 'skin-tone' | 'eyes' | 'nose' | 'mouth' | 'hair' | 'features' | 'accessories';
type AccessoryFilter = 'all' | 'headwear' | 'eyewear' | 'piercings';

interface CustomizeControlsProps {
  character: CharacterAttributes;
  updateCharacter: (updates: Partial<CharacterAttributes>) => void;
  selectedCategory: Category;
}

export default function CustomizeControls({
  character,
  updateCharacter,
  selectedCategory,
}: CustomizeControlsProps) {
  const [accessoryFilter, setAccessoryFilter] = useState<AccessoryFilter>('headwear');

  return (
    <div>
      {/* Skin Tone Controls */}
      {selectedCategory === 'skin-tone' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 
            style={{
              position: 'sticky',
              top: '0px',
              zIndex: 10,
              backgroundColor: '#F7F9FB',
              marginTop: '0px',
              marginLeft: '-32px',
              marginRight: '-32px',
              paddingTop: '32px',
              paddingBottom: '24px',
              paddingLeft: '32px',
              paddingRight: '32px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#010820',
              width: 'calc(100% + 64px)',
              textAlign: 'left'
            }}
          >
            Skin Tone
          </h3>
          
          {/* Skin Tone Items - 3 columns, 12 items total */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 128px)',
              gap: '16px'
            }}
          >
            {Array.from({ length: 12 }, (_, index) => {
              const itemId = `skin-tone-${index + 1}`;
              const itemNumber = index + 1;
              const isSelected = character.face.skinToneItemId === itemNumber;
              
              return (
                <button
                  key={itemId}
                  onClick={() =>
                    updateCharacter({
                      face: { 
                        ...character.face, 
                        color: SKIN_COLORS[index] || SKIN_COLORS[0],
                        skinToneItemId: itemNumber
                      },
                    })
                  }
                  className="relative transition-all duration-200"
                  style={{
                    width: '128px',
                    height: '128px',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'block'
                  }}
                >
                  <div style={{ 
                    position: 'relative', 
                    width: '128px', 
                    height: '128px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}>
                    {/* Item Image */}
                    <img
                      src={`/skin-tone-item-${index + 1}.svg`}
                      alt={`Skin Tone ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain',
                        zIndex: 1
                      }}
                    />
                    
                    {/* Frame */}
                    <img
                      src={isSelected ? '/frame-selected.svg' : '/frame-default.svg'}
                      alt="frame"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '128px',
                        height: '128px',
                        pointerEvents: 'none',
                        objectFit: 'contain',
                        zIndex: 2
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Eyes Controls */}
      {selectedCategory === 'eyes' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Sticky 헤더 영역: 타이틀만 */}
          <div 
            style={{
              position: 'sticky',
              top: '0px',
              zIndex: 10,
              backgroundColor: '#F7F9FB',
              marginLeft: '-32px',
              marginRight: '-32px',
              paddingLeft: '32px',
              paddingRight: '32px',
              paddingTop: '32px',
              paddingBottom: '24px',
              width: 'calc(100% + 64px)',
            }}
          >
            <h3 
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#010820',
                marginBottom: '0px',
                textAlign: 'left'
              }}
            >
              Eyes
            </h3>
          </div>

          {/* Eye Color Presets - 2 rows */}
          <div style={{ marginBottom: '24px', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Row 1 - First 8 colors */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {EYE_COLORS.slice(0, 8).map((color, index) => {
                  const isSelected = character.eyes.color === color;
                  const isGradient1 = color === 'gradient1';
                  const isGradient2 = color === 'gradient2';
                  return (
                    <button
                      key={`eye-${index}`}
                      onClick={() =>
                        updateCharacter({
                          eyes: { ...character.eyes, color },
                        })
                      }
                      className="transition-all duration-200"
                      style={{
                        width: '42px',
                        height: '42px',
                        padding: 0,
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'auto',
                        flexShrink: 0
                      }}
                    >
                      {/* White background circle */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '5px',
                          left: '5px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          zIndex: 0
                        }}
                      />
                      {/* 내부 원형 컬러 (32px) - Half-half or solid */}
                      {isGradient1 ? (
                        <div
                          style={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            zIndex: 1
                          }}
                        >
                          <div style={{ width: '50%', height: '100%', backgroundColor: '#36A3FF', float: 'left' }} />
                          <div style={{ width: '50%', height: '100%', backgroundColor: '#863517', float: 'left' }} />
                        </div>
                      ) : isGradient2 ? (
                        <div
                          style={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            zIndex: 1
                          }}
                        >
                          <div style={{ width: '50%', height: '100%', backgroundColor: '#53BD00', float: 'left' }} />
                          <div style={{ width: '50%', height: '100%', backgroundColor: '#814813', float: 'left' }} />
                        </div>
                      ) : (
                        <div
                          style={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            zIndex: 1
                          }}
                        />
                      )}
                      {/* 프레임 */}
                      <img
                        src={isSelected ? '/preset-selected.svg' : '/preset-default.svg'}
                        alt="preset frame"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '42px',
                          height: '42px',
                          pointerEvents: 'none',
                          zIndex: 2
                        }}
                      />
                    </button>
                  );
                })}
              </div>
              
              {/* Row 2 - Last 8 colors */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {EYE_COLORS.slice(8, 16).map((color, index) => {
                  const isSelected = character.eyes.color === color;
                  const isGradient1 = color === 'gradient1';
                  const isGradient2 = color === 'gradient2';
                  return (
                    <button
                      key={`eye-${index + 8}`}
                      onClick={() =>
                        updateCharacter({
                          eyes: { ...character.eyes, color },
                        })
                      }
                      className="transition-all duration-200"
                      style={{
                        width: '42px',
                        height: '42px',
                        padding: 0,
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'auto',
                        flexShrink: 0
                      }}
                    >
                      {/* White background circle */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '5px',
                          left: '5px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          zIndex: 0
                        }}
                      />
                      {/* 내부 원형 컬러 (32px) - Half-half or solid */}
                      {isGradient1 ? (
                        <div
                          style={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            zIndex: 1
                          }}
                        >
                          <div style={{ width: '50%', height: '100%', backgroundColor: '#36A3FF', float: 'left' }} />
                          <div style={{ width: '50%', height: '100%', backgroundColor: '#863517', float: 'left' }} />
                        </div>
                      ) : isGradient2 ? (
                        <div
                          style={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            zIndex: 1
                          }}
                        >
                          <div style={{ width: '50%', height: '100%', backgroundColor: '#53BD00', float: 'left' }} />
                          <div style={{ width: '50%', height: '100%', backgroundColor: '#814813', float: 'left' }} />
                        </div>
                      ) : (
                        <div
                          style={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            zIndex: 1
                          }}
                        />
                      )}
                      {/* 프레임 */}
                      <img
                        src={isSelected ? '/preset-selected.svg' : '/preset-default.svg'}
                        alt="preset frame"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '42px',
                          height: '42px',
                          pointerEvents: 'none',
                          zIndex: 2
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Eye Spacing Slider - none이 아닐 때만 표시 */}
          {character.eyes.eyeItemId && (
          <div style={{ width: '100%', marginBottom: '24px' }}>
            <label 
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#718096',
                marginBottom: '8px'
              }}
            >
              Eye Spacing: {character.eyes.spacing.toFixed(0)}
            </label>
            <input
              type="range"
              min="-15"
              max="15"
              value={character.eyes.spacing}
              onChange={(e) =>
                updateCharacter({
                  eyes: { ...character.eyes, spacing: parseFloat(e.target.value) },
                })
              }
              style={{
                '--range-progress': `${((character.eyes.spacing + 15) / 30) * 100}%`
              } as React.CSSProperties}
            />
          </div>
          )}

          {/* Scrollable Eye Items Container */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            paddingBottom: '32px'
          }}>

          {/* Eye Items - 3 columns, 6 items total (None + 5) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 128px)',
              gap: '16px',
              marginBottom: '32px'
            }}
          >
            {/* None 아이템 */}
            <button
              onClick={() =>
                updateCharacter({
                  eyes: { 
                    ...character.eyes, 
                    eyeItemId: undefined
                  },
                })
              }
              className="relative transition-all duration-200"
              style={{
                width: '128px',
                height: '128px',
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'block'
              }}
            >
              <div style={{
                position: 'relative',
                width: '128px',
                height: '128px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#4B5563',
                  zIndex: 1
                }}>
                  None
                </span>
                <img
                  src={!character.eyes.eyeItemId ? '/frame-selected.svg' : '/frame-default.svg'}
                  alt="frame"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '128px',
                    height: '128px',
                    pointerEvents: 'none',
                    objectFit: 'contain',
                    zIndex: 2
                  }}
                />
              </div>
            </button>

            {Array.from({ length: 5 }, (_, index) => {
              const itemId = `eyes-item-${index + 1}`;
              const itemNumber = index + 1;
              const isSelected = character.eyes.eyeItemId === itemNumber;
              
              return (
                <button
                  key={itemId}
                  onClick={() =>
                    updateCharacter({
                      eyes: { 
                        ...character.eyes, 
                        eyeItemId: itemNumber
                      },
                    })
                  }
                  className="relative transition-all duration-200"
                  style={{
                    width: '128px',
                    height: '128px',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'block'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '128px',
                    height: '128px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px'
                  }}>
                    {/* Item Image */}
                    <img
                      src={`/eyes-item-${index + 1}.svg`}
                      alt={`Eyes ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain',
                        zIndex: 1
                      }}
                    />

                    {/* Frame */}
                    <img
                      src={isSelected ? '/frame-selected.svg' : '/frame-default.svg'}
                      alt="frame"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '128px',
                        height: '128px',
                        pointerEvents: 'none',
                        objectFit: 'contain',
                        zIndex: 2
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        </div>
      )}

      {/* Nose Controls */}
      {selectedCategory === 'nose' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Sticky 헤더 영역: 타이틀 + 슬라이더 */}
          <div 
            style={{
              position: 'sticky',
              top: '0px',
              zIndex: 10,
              backgroundColor: '#F7F9FB',
              marginLeft: '-32px',
              marginRight: '-32px',
              paddingLeft: '32px',
              paddingRight: '32px',
              paddingTop: '32px',
              paddingBottom: character.nose.noseItemId ? '24px' : '24px',
              width: 'calc(100% + 64px)',
            }}
          >
            <h3 
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#010820',
                marginBottom: character.nose.noseItemId ? '24px' : '0px',
                textAlign: 'left'
              }}
            >
              Nose
            </h3>

            {/* Sliders - Only shown when item is selected */}
            {character.nose.noseItemId && (
              <>
                {/* Size Slider */}
                <div style={{ marginBottom: '24px', width: '100%' }}>
                  <label 
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#718096',
                      marginBottom: '8px'
                    }}
                  >
                    Size: {character.nose.size.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={character.nose.size}
                    onChange={(e) =>
                      updateCharacter({
                        nose: {
                          ...character.nose,
                          size: parseFloat(e.target.value),
                        },
                      })
                    }
                    style={{
                      '--range-progress': `${((character.nose.size - 0.5) / (1.5 - 0.5)) * 100}%`
                    } as React.CSSProperties}
                  />
                </div>

                {/* Y Position Slider */}
                <div style={{ width: '100%' }}>
                  <label 
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#718096',
                      marginBottom: '8px'
                    }}
                  >
                    Y Position: {character.nose.position.y.toFixed(0)}
                  </label>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    step="1"
                    value={character.nose.position.y}
                    onChange={(e) =>
                      updateCharacter({
                        nose: {
                          ...character.nose,
                          position: { x: 0, y: parseFloat(e.target.value) },
                        },
                      })
                    }
                    style={{
                      '--range-progress': `${((character.nose.position.y + 30) / 60) * 100}%`
                    } as React.CSSProperties}
                  />
                </div>
              </>
            )}
          </div>

          {/* Scrollable Nose Items Container */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            paddingBottom: '32px'
          }}>

          {/* Nose Items - 3 columns, 4 items total (None + 3) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 128px)',
              gap: '16px',
              marginBottom: '32px'
            }}
          >
            {/* None 아이템 */}
            <button
              onClick={() =>
                updateCharacter({
                  nose: { 
                    ...character.nose, 
                    noseItemId: undefined
                  },
                })
              }
              className="relative transition-all duration-200"
              style={{
                width: '128px',
                height: '128px',
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'block'
              }}
            >
              <div style={{
                position: 'relative',
                width: '128px',
                height: '128px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#4B5563',
                  zIndex: 1
                }}>
                  None
                </span>
                <img
                  src={!character.nose.noseItemId ? '/frame-selected.svg' : '/frame-default.svg'}
                  alt="frame"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '128px',
                    height: '128px',
                    pointerEvents: 'none',
                    objectFit: 'contain',
                    zIndex: 2
                  }}
                />
              </div>
            </button>

            {Array.from({ length: 3 }, (_, index) => {
              const itemId = `nose-item-${index + 1}`;
              const itemNumber = index + 1;
              const isSelected = character.nose.noseItemId === itemNumber;
              
              return (
                <button
                  key={itemId}
                  onClick={() =>
                    updateCharacter({
                      nose: { 
                        ...character.nose, 
                        noseItemId: itemNumber
                      },
                    })
                  }
                  className="relative transition-all duration-200"
                  style={{
                    width: '128px',
                    height: '128px',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'block'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '128px',
                    height: '128px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px'
                  }}>
                    {/* Item Image */}
                    <img
                      src={`/nose-item-${index + 1}.svg`}
                      alt={`Nose ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain',
                        zIndex: 1
                      }}
                    />

                    {/* Frame */}
                    <img
                      src={isSelected ? '/frame-selected.svg' : '/frame-default.svg'}
                      alt="frame"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '128px',
                        height: '128px',
                        pointerEvents: 'none',
                        objectFit: 'contain',
                        zIndex: 2
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
          </div>
        </div>
      )}

      {/* Mouth Controls */}
      {selectedCategory === 'mouth' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Sticky 헤더 영역: 타이틀 + 슬라이더 */}
          <div 
            style={{
              position: 'sticky',
              top: '0px',
              zIndex: 10,
              backgroundColor: '#F7F9FB',
              marginLeft: '-32px',
              marginRight: '-32px',
              paddingLeft: '32px',
              paddingRight: '32px',
              paddingTop: '32px',
              paddingBottom: character.mouth.mouthItemId ? '24px' : '24px',
              width: 'calc(100% + 64px)',
            }}
          >
            <h3 
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#010820',
                marginBottom: character.mouth.mouthItemId ? '24px' : '0px',
                textAlign: 'left'
              }}
            >
              Mouth
            </h3>

            {/* Sliders - Only shown when item is selected */}
            {character.mouth.mouthItemId && (
              <>
                {/* Size Slider */}
                <div style={{ marginBottom: '24px', width: '100%' }}>
                  <label 
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#718096',
                      marginBottom: '8px'
                    }}
                  >
                    Size: {character.mouth.size.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={character.mouth.size}
                    onChange={(e) =>
                      updateCharacter({
                        mouth: {
                          ...character.mouth,
                          size: parseFloat(e.target.value),
                        },
                      })
                    }
                    style={{
                      '--range-progress': `${((character.mouth.size - 0.5) / (1.5 - 0.5)) * 100}%`
                    } as React.CSSProperties}
                  />
                </div>

            

                {/* Y Position Slider */}
                <div style={{ width: '100%' }}>
                  <label 
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#718096',
                      marginBottom: '8px'
                    }}
                  >
                    Y Position: {character.mouth.position?.y.toFixed(0) || '0'}
                  </label>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    step="1"
                    value={character.mouth.position?.y || 0}
                    onChange={(e) =>
                      updateCharacter({
                        mouth: {
                          ...character.mouth,
                          position: { 
                            x: character.mouth.position?.x || 0, 
                            y: parseFloat(e.target.value) 
                          },
                        },
                      })
                    }
                    style={{
                      '--range-progress': `${(((character.mouth.position?.y || 0) + 20) / 40) * 100}%`
                    } as React.CSSProperties}
                  />
                </div>
              </>
            )}
          </div>

          {/* Scrollable Mouth Items Container */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            paddingBottom: '32px'
          }}>

          {/* Mouth Items - 3 columns, 7 items total (None + 6) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 128px)',
              gap: '16px',
              marginBottom: '32px'
            }}
          >
            {/* None 아이템 */}
            <button
              onClick={() =>
                updateCharacter({
                  mouth: { 
                    ...character.mouth, 
                    mouthItemId: undefined
                  },
                })
              }
              className="relative transition-all duration-200"
              style={{
                width: '128px',
                height: '128px',
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'block'
              }}
            >
              <div style={{
                position: 'relative',
                width: '128px',
                height: '128px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#4B5563',
                  zIndex: 1
                }}>
                  None
                </span>
                <img
                  src={!character.mouth.mouthItemId ? '/frame-selected.svg' : '/frame-default.svg'}
                  alt="frame"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '128px',
                    height: '128px',
                    pointerEvents: 'none',
                    objectFit: 'contain',
                    zIndex: 2
                  }}
                />
              </div>
            </button>

            {Array.from({ length: 6 }, (_, index) => {
              const itemId = `mouth-item-${index + 1}`;
              const itemNumber = index + 1;
              const isSelected = character.mouth.mouthItemId === itemNumber;
              
              return (
                <button
                  key={itemId}
                  onClick={() =>
                    updateCharacter({
                      mouth: { 
                        ...character.mouth, 
                        mouthItemId: itemNumber
                      },
                    })
                  }
                  className="relative transition-all duration-200"
                  style={{
                    width: '128px',
                    height: '128px',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'block'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '128px',
                    height: '128px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}>
                    {/* Item Image */}
                    <img
                      src={`/mouth-item-${index + 1}.svg`}
                      alt={`Mouth ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain',
                        zIndex: 1
                      }}
                    />

                    {/* Frame */}
                    <img
                      src={isSelected ? '/frame-selected.svg' : '/frame-default.svg'}
                      alt="frame"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '128px',
                        height: '128px',
                        pointerEvents: 'none',
                        objectFit: 'contain',
                        zIndex: 2
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
          </div>
        </div>
      )}

      {/* Hair Controls */}
      {selectedCategory === 'hair' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Sticky 헤더 영역: 타이틀만 */}
          <div 
            style={{
              position: 'sticky',
              top: '0px',
              zIndex: 10,
              backgroundColor: '#F7F9FB',
              marginLeft: '-32px',
              marginRight: '-32px',
              paddingLeft: '32px',
              paddingRight: '32px',
              paddingTop: '32px',
              paddingBottom: '24px',
              width: 'calc(100% + 64px)',
            }}
          >
            <h3 
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#010820',
                marginBottom: '0px',
                textAlign: 'left'
              }}
            >
              Hair
            </h3>
          </div>

          {/* Hair Color Presets - 2 rows */}
          <div style={{ marginBottom: '24px', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Row 1 - First 8 colors */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {HAIR_COLORS.slice(0, 8).map((color, index) => {
                  const isSelected = character.hair.color === color;
                  const isGradient = color === 'gradient';
                  return (
                    <button
                      key={`hair-${index}`}
                      onClick={() =>
                        updateCharacter({
                          hair: { ...character.hair, color },
                        })
                      }
                      className="transition-all duration-200"
                      style={{
                        width: '42px',
                        height: '42px',
                        padding: 0,
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}
                    >
                      {/* White background circle */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '5px',
                          left: '5px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          zIndex: 0
                        }}
                      />
                      {/* 내부 원형 컬러 (32px) - Gradient or solid */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '5px',
                          left: '5px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: isGradient 
                            ? 'linear-gradient(132deg, #FF1313 5.54%, #FFCD57 34.66%, #89FFAE 59.23%, #6392FF 84.25%, #D5CCFF 100.18%)'
                            : color,
                          zIndex: 1
                        }}
                      />
                      {/* 프레임 */}
                      <img
                        src={isSelected ? '/preset-selected.svg' : '/preset-default.svg'}
                        alt="preset frame"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '42px',
                          height: '42px',
                          pointerEvents: 'none',
                          zIndex: 2
                        }}
                      />
                    </button>
                  );
                })}
              </div>
              
              {/* Row 2 - Last 8 colors */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {HAIR_COLORS.slice(8, 16).map((color, index) => {
                  const isSelected = character.hair.color === color;
                  const isGradient = color === 'gradient';
                  return (
                    <button
                      key={`hair-${index + 8}`}
                      onClick={() =>
                        updateCharacter({
                          hair: { ...character.hair, color },
                        })
                      }
                      className="transition-all duration-200"
                      style={{
                        width: '42px',
                        height: '42px',
                        padding: 0,
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}
                    >
                      {/* White background circle */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '5px',
                          left: '5px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          zIndex: 0
                        }}
                      />
                      {/* 내부 원형 컬러 (32px) - Gradient or solid */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '5px',
                          left: '5px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: isGradient 
                            ? 'linear-gradient(132deg, #FF1313 5.54%, #FFCD57 34.66%, #89FFAE 59.23%, #6392FF 84.25%, #D5CCFF 100.18%)'
                            : color,
                          zIndex: 1
                        }}
                      />
                      {/* 프레임 */}
                      <img
                        src={isSelected ? '/preset-selected.svg' : '/preset-default.svg'}
                        alt="preset frame"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '42px',
                          height: '42px',
                          pointerEvents: 'none',
                          zIndex: 2
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scrollable Hair Items Container */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            paddingBottom: '32px'
          }}>

          {/* Hair Items - 3 columns, 35 items total (None + 34) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 128px)',
              gap: '16px',
              marginBottom: '32px'
            }}
          >
            {/* None 아이템 */}
            <button
              onClick={() =>
                updateCharacter({
                  hair: { 
                    ...character.hair, 
                    hairItemId: undefined
                  },
                })
              }
              className="relative transition-all duration-200"
              style={{
                width: '128px',
                height: '128px',
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'block'
              }}
            >
              <div style={{
                position: 'relative',
                width: '128px',
                height: '128px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#4B5563',
                  zIndex: 1
                }}>
                  None
                </span>
                <img
                  src={!character.hair.hairItemId ? '/frame-selected.svg' : '/frame-default.svg'}
                  alt="frame"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '128px',
                    height: '128px',
                    pointerEvents: 'none',
                    objectFit: 'contain',
                    zIndex: 2
                  }}
                />
              </div>
            </button>

            {/* Hair items in custom order: 1-6, 34, 7-30, 33, 31-32 */}
            {[1, 2, 3, 4, 5, 6, 34, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 31, 32].map((itemNumber) => {
              const itemId = `hair-item-${itemNumber}`;
              const isSelected = character.hair.hairItemId === itemNumber;
              
              return (
                <button
                  key={itemId}
                  onClick={() =>
                    updateCharacter({
                      hair: { 
                        ...character.hair, 
                        hairItemId: itemNumber
                      },
                    })
                  }
                  className="relative transition-all duration-200"
                  style={{
                    width: '128px',
                    height: '128px',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'block'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '128px',
                    height: '128px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}>
                    {/* Item Image */}
                    <img
                      src={`/hair-item-${itemNumber}.svg`}
                      alt={`Hair ${itemNumber}`}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain',
                        zIndex: 1
                      }}
                    />

                    {/* Frame */}
                    <img
                      src={isSelected ? '/frame-selected.svg' : '/frame-default.svg'}
                      alt="frame"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '128px',
                        height: '128px',
                        pointerEvents: 'none',
                        objectFit: 'contain',
                        zIndex: 2
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        </div>
      )}

      {/* Features Controls */}
      {selectedCategory === 'features' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 
            style={{
              position: 'sticky',
              top: '0px',
              zIndex: 10,
              backgroundColor: '#F7F9FB',
              marginTop: '0px',
              marginLeft: '-32px',
              marginRight: '-32px',
              paddingTop: '32px',
              paddingBottom: '24px',
              paddingLeft: '32px',
              paddingRight: '0px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#010820',
              width: 'calc(100% + 64px)',
              textAlign: 'left'
            }}
          >
            Features
          </h3>

          {/* Features Items - 3 columns, 13 items total (None + 12) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 128px)',
              gap: '16px'
            }}
          >
            {/* None 아이템 */}
            <button
              onClick={() =>
                updateCharacter({
                  features: { 
                    featureItemId: undefined
                  },
                })
              }
              className="relative transition-all duration-200"
              style={{
                width: '128px',
                height: '128px',
                padding: 0,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'block'
              }}
            >
              <div style={{
                position: 'relative',
                width: '128px',
                height: '128px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#4B5563',
                  zIndex: 1
                }}>
                  None
                </span>
                <img
                  src={!character.features?.featureItemId ? '/frame-selected.svg' : '/frame-default.svg'}
                  alt="frame"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '128px',
                    height: '128px',
                    pointerEvents: 'none',
                    objectFit: 'contain',
                    zIndex: 2
                  }}
                />
              </div>
            </button>

            {Array.from({ length: 13 }, (_, index) => {
              const itemId = `features-item-${index + 1}`;
              const itemNumber = index + 1;
              const isSelected = character.features?.featureItemId === itemNumber;
              
              return (
                <button
                  key={itemId}
                  onClick={() =>
                    updateCharacter({
                      features: { 
                        featureItemId: itemNumber
                      },
                    })
                  }
                  className="relative transition-all duration-200"
                  style={{
                    width: '128px',
                    height: '128px',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'block'
                  }}
                >
                  <div style={{ 
                    position: 'relative', 
                    width: '128px', 
                    height: '128px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}>
                    {/* Item Image */}
                    <img
                      src={`/features-item-${index + 1}.svg`}
                      alt={`Feature ${index + 1}`}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120px',
                        height: '120px',
                        objectFit: 'contain',
                        zIndex: 1
                      }}
                    />

                    {/* Frame */}
                    <img
                      src={isSelected ? '/frame-selected.svg' : '/frame-default.svg'}
                      alt="frame"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '128px',
                        height: '128px',
                        pointerEvents: 'none',
                        objectFit: 'contain',
                        zIndex: 2
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Accessories Controls */}
      {selectedCategory === 'accessories' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Sticky 헤더 영역: 타이틀 + Chip Group + 슬라이더 */}
          <div
            style={{
              position: 'sticky',
              top: '0px',
              zIndex: 10,
              backgroundColor: '#F7F9FB',
              marginLeft: '-32px',
              marginRight: '-32px',
              paddingTop: '32px',
              paddingBottom: '24px',
              paddingLeft: '32px',
              paddingRight: '32px',
              width: 'calc(100% + 64px)',
            }}
          >
            <h3 
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#010820',
                marginBottom: '24px',
                textAlign: 'left'
              }}
            >
              Accessories
            </h3>

            {/* Chip Group */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: (character.accessories.headwear.itemId || character.accessories.eyewear.itemId || character.accessories.piercings.itemId) ? '24px' : '0px' }}>
              {[
                { id: 'headwear' as AccessoryFilter, label: 'Headwear' },
                { id: 'eyewear' as AccessoryFilter, label: 'Eyewear' },
                { id: 'piercings' as AccessoryFilter, label: 'Piercings' }
              ].map((chip) => {
                const isActive = accessoryFilter === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setAccessoryFilter(chip.id)}
                    onMouseDown={(e) => e.currentTarget.style.backgroundColor = isActive ? 'transparent' : 'rgba(31, 41, 55, 0.08)'}
                    onMouseUp={(e) => e.currentTarget.style.backgroundColor = isActive ? 'transparent' : 'transparent'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isActive ? 'transparent' : 'transparent'}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      border: `1px solid ${isActive ? '#3B82F6' : '#EDF2F7'}`,
                      backgroundColor: isActive ? 'transparent' : 'transparent',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: isActive ? '#3B82F6' : '#111827',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 0.04)';
                      }
                    }}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* Sliders - 필터별로 조건부 표시 */}
            {/* Headwear Y Position Slider - headwear 필터일 때만 표시 */}
            {character.accessories.headwear.itemId && accessoryFilter === 'headwear' && (
              <div style={{ width: '100%' }}>
                <label 
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#718096',
                    marginBottom: '8px'
                  }}
                >
                  Y Position: {character.accessories.headwear.position.y.toFixed(0)}
                </label>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  value={character.accessories.headwear.position.y}
                  onChange={(e) =>
                    updateCharacter({
                      accessories: {
                        ...character.accessories,
                        headwear: {
                          ...character.accessories.headwear,
                          position: { x: 0, y: parseFloat(e.target.value) },
                        },
                      },
                    })
                  }
                  style={{
                    '--range-progress': `${((character.accessories.headwear.position.y + 20) / 40) * 100}%`
                  } as React.CSSProperties}
                />
              </div>
            )}

            {/* Eyewear Y Position Slider - eyewear 필터일 때만 표시 */}
            {character.accessories.eyewear.itemId && accessoryFilter === 'eyewear' && (
              <div style={{ width: '100%' }}>
                <label 
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#718096',
                    marginBottom: '8px'
                  }}
                >
                  Y Position: {character.accessories.eyewear.position.y.toFixed(0)}
                </label>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  value={character.accessories.eyewear.position.y}
                  onChange={(e) =>
                    updateCharacter({
                      accessories: {
                        ...character.accessories,
                        eyewear: {
                          ...character.accessories.eyewear,
                          position: { x: 0, y: parseFloat(e.target.value) },
                        },
                      },
                    })
                  }
                  style={{
                    '--range-progress': `${((character.accessories.eyewear.position.y + 20) / 40) * 100}%`
                  } as React.CSSProperties}
                />
              </div>
            )}

            {/* Piercings Y Position Slider - piercings 필터 또는 all 필터일 때만 표시 */}
            {character.accessories.piercings.itemId && (accessoryFilter === 'all' || accessoryFilter === 'piercings') && (
              <div style={{ width: '100%' }}>
                <label 
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#718096',
                    marginBottom: '8px'
                  }}
                >
                  Y Position: {character.accessories.piercings.position.y.toFixed(0)}
                </label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="1"
                  value={character.accessories.piercings.position.y}
                  onChange={(e) =>
                    updateCharacter({
                      accessories: {
                        ...character.accessories,
                        piercings: {
                          ...character.accessories.piercings,
                          position: { x: 0, y: parseFloat(e.target.value) },
                        },
                      },
                    })
                  }
                  style={{
                    '--range-progress': `${((character.accessories.piercings.position.y + 50) / 100) * 100}%`
                  } as React.CSSProperties}
                />
              </div>
            )}
          </div>

          {/* Scrollable Accessories Items Container */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            paddingBottom: '32px'
          }}>

          {/* Headwear Category */}
          {accessoryFilter === 'headwear' && (
          <div style={{ marginBottom: '32px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {false && (
              <h4 
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151', // gray-700
                  marginBottom: '16px',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                Headwear
              </h4>
            )}
            
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 128px)',
                gap: '16px'
              }}
            >
              {/* None 버튼 */}
              <button
                onClick={() =>
                  updateCharacter({
                    accessories: { 
                      ...character.accessories,
                      headwear: { 
                        ...character.accessories.headwear,
                        itemId: undefined 
                      }
                    },
                  })
                }
                className="relative transition-all duration-200"
                style={{
                  width: '128px',
                  height: '128px',
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '128px',
                  height: '128px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#4B5563',
                    zIndex: 1
                  }}>
                    None
                  </span>
                  <img
                    src={!character.accessories.headwear.itemId ? '/frame-selected.svg' : '/frame-default.svg'}
                    alt="frame"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '128px',
                      height: '128px',
                      pointerEvents: 'none',
                      objectFit: 'contain',
                      zIndex: 2
                    }}
                  />
                </div>
              </button>

              {/* Headwear Items (11개) - 단일 선택 */}
              {Array.from({ length: 11 }, (_, index) => {
                const itemNumber = index + 1;
                const isSelected = character.accessories.headwear.itemId === itemNumber;
                
                return (
                  <button
                    key={`headwear-${itemNumber}`}
                    onClick={() => {
                      updateCharacter({
                        accessories: { 
                          ...character.accessories,
                          headwear: { 
                            ...character.accessories.headwear,
                            itemId: itemNumber 
                          }
                        },
                      });
                    }}
                    className="relative transition-all duration-200"
                    style={{
                      width: '128px',
                      height: '128px',
                      padding: 0,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      display: 'block'
                    }}
                  >
                    <div style={{ 
                      position: 'relative', 
                      width: '128px', 
                      height: '128px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px'
                    }}>
                      <img
                        src={`/headwear-item-${itemNumber}.svg`}
                        alt={`Headwear ${itemNumber}`}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '120px',
                          height: '120px',
                          objectFit: 'contain',
                          zIndex: 1
                        }}
                      />
                      <img
                        src={isSelected ? '/frame-selected.svg' : '/frame-default.svg'}
                        alt="frame"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '128px',
                          height: '128px',
                          pointerEvents: 'none',
                          objectFit: 'contain',
                          zIndex: 2
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          )}

          {/* Eyewear Category */}
          {(accessoryFilter === 'all' || accessoryFilter === 'eyewear') && (
          <div style={{ marginBottom: '32px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {accessoryFilter === 'all' && (
              <h4 
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151', // gray-700
                  marginBottom: '16px',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                Eyewear
              </h4>
            )}
            
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 128px)',
                gap: '16px'
              }}
            >
              {/* None 버튼 */}
              <button
                onClick={() =>
                  updateCharacter({
                    accessories: { 
                      ...character.accessories,
                      eyewear: { 
                        ...character.accessories.eyewear,
                        itemId: undefined
                      }
                    },
                  })
                }
                className="relative transition-all duration-200"
                style={{
                  width: '128px',
                  height: '128px',
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '128px',
                  height: '128px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#4B5563',
                    zIndex: 1
                  }}>
                    None
                  </span>
                  <img
                    src={!character.accessories.eyewear.itemId ? '/frame-selected.svg' : '/frame-default.svg'}
                    alt="frame"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '128px',
                      height: '128px',
                      pointerEvents: 'none',
                      objectFit: 'contain',
                      zIndex: 2
                    }}
                  />
                </div>
              </button>

              {Array.from({ length: 8 }, (_, index) => {
                const itemId = `eyewear-${index + 1}`;
                const itemNumber = index + 1;
                const isSelected = character.accessories.eyewear.itemId === itemNumber;
                
                return (
                  <button
                    key={itemId}
                    onClick={() =>
                      updateCharacter({
                        accessories: { 
                          ...character.accessories,
                          eyewear: { 
                            ...character.accessories.eyewear,
                            itemId: itemNumber
                          }
                        },
                      })
                    }
                    className="relative transition-all duration-200"
                    style={{
                      width: '128px',
                      height: '128px',
                      padding: 0,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      display: 'block'
                    }}
                  >
                    <div style={{
                      position: 'relative',
                      width: '128px',
                      height: '128px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      overflow: 'hidden'
                    }}>
                      {/* Item Image */}
                      <img
                        src={`/eyewear-item-${index + 1}.svg`}
                        alt={`Eyewear ${index + 1}`}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '120px',
                          height: '120px',
                          objectFit: 'contain',
                          zIndex: 1
                        }}
                      />

                      {/* Frame */}
                      <img
                        src={isSelected ? '/frame-selected.svg' : '/frame-default.svg'}
                        alt="frame"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '128px',
                          height: '128px',
                          pointerEvents: 'none',
                          objectFit: 'contain',
                          zIndex: 2
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          )}

          {/* Piercings Category */}
          {accessoryFilter === 'piercings' && (
          <div style={{ marginBottom: '32px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {false && (
              <h4 
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151', // gray-700
                  marginBottom: '16px',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                Piercings
              </h4>
            )}
            
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 128px)',
                gap: '16px'
              }}
            >
              {/* None 버튼 */}
              <button
                onClick={() =>
                  updateCharacter({
                    accessories: { 
                      ...character.accessories,
                      piercings: { 
                        ...character.accessories.piercings,
                        itemId: undefined
                      }
                    },
                  })
                }
                className="relative transition-all duration-200"
                style={{
                  width: '128px',
                  height: '128px',
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '128px',
                  height: '128px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#4B5563',
                    zIndex: 1
                  }}>
                    None
                  </span>
                  <img
                    src={!character.accessories.piercings.itemId ? '/frame-selected.svg' : '/frame-default.svg'}
                    alt="frame"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '128px',
                      height: '128px',
                      pointerEvents: 'none',
                      objectFit: 'contain',
                      zIndex: 2
                    }}
                  />
                </div>
              </button>

              {Array.from({ length: 5 }, (_, index) => {
                const itemId = `piercings-${index + 1}`;
                const itemNumber = index + 1;
                const isSelected = character.accessories.piercings.itemId === itemNumber;
                
                return (
                  <button
                    key={itemId}
                    onClick={() =>
                      updateCharacter({
                        accessories: { 
                          ...character.accessories,
                          piercings: { 
                            ...character.accessories.piercings,
                            itemId: itemNumber
                          }
                        },
                      })
                    }
                    className="relative transition-all duration-200"
                    style={{
                      width: '128px',
                      height: '128px',
                      padding: 0,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      display: 'block'
                    }}
                  >
                    <div style={{
                      position: 'relative',
                      width: '128px',
                      height: '128px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      overflow: 'hidden'
                    }}>
                      {/* Item Image */}
                      <img
                        src={`/piercings-item-${index + 1}.svg`}
                        alt={`Piercings ${index + 1}`}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '120px',
                          height: '120px',
                          objectFit: 'contain',
                          zIndex: 1
                        }}
                      />

                      {/* Frame */}
                      <img
                        src={isSelected ? '/frame-selected.svg' : '/frame-default.svg'}
                        alt="frame"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '128px',
                          height: '128px',
                          pointerEvents: 'none',
                          objectFit: 'contain',
                          zIndex: 2
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
}
