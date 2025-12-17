'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);

  // Save 페이지인지 확인
  const isSavePage = pathname === '/save';
  const isCustomizePage = pathname === '/customize';

  const handleNavigation = (path: string) => {
    if (pathname === path) return;
    router.push(path);
  };

  return (
    <>
      {/* Grid 배경 - 전체 페이지 고정 */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/grid-bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.24
        }}
      />

      {/* 네비게이션 - Save 페이지에서는 숨김 */}
      {!isSavePage && (
        <div className="w-full px-8 py-6 fixed top-0 left-0 right-0 z-50" style={{ minHeight: '88px', backgroundColor: 'transparent' }}>
          <div className="relative" style={{ width: '100%', height: '48px' }}>
            {/* 중앙: Nav 컨테이너 (로고 + 메뉴) - 화면 정중앙에 절대 위치 고정 */}
            <div 
              className="flex items-center rounded-full"
              style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                transform: 'translateX(-50%)',
                backgroundColor: '#FFFFFF',
                border: '1px solid #EDF2F7',
                boxShadow: '0 1px 8px rgba(48, 58, 75, 0.08)',
                height: '48px',
                paddingLeft: '24px',
                paddingRight: '24px',
                gap: '120px'
              }}
            >
              {/* 로고 */}
              <div className="flex items-center">
                <Image 
                  src="/logo.svg" 
                  alt="Logo" 
                  width={24}
                  height={24}
                  priority
                  style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                />
                <div 
                  style={{
                    width: '1px',
                    height: '24px',
                    backgroundColor: '#EDF2F7',
                    margin: '0 12px'
                  }}
                />
                <span 
                  style={{ 
                    color: '#010820',
                    fontSize: '16px',
                    lineHeight: '130%',
                    fontWeight: 500
                  }}
                >
                  Mugshot Lab
                </span>
              </div>
              
              {/* 메뉴 */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleNavigation('/')}
                  style={{
                    fontSize: '14px',
                    lineHeight: '130%',
                    fontWeight: 500,
                    color: pathname === '/' ? '#010820' : '#A0AEC0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Main
                </button>
                <button
                  onClick={() => handleNavigation('/customize')}
                  style={{
                    fontSize: '14px',
                    lineHeight: '130%',
                    fontWeight: 500,
                    color: pathname === '/customize' ? '#010820' : '#A0AEC0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Create
                </button>
                <div 
                  className="relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      lineHeight: '130%',
                      fontWeight: 500,
                      color: '#CBD5E0',
                      cursor: 'not-allowed'
                    }}
                  >
                    Gallery
                  </span>
                  {showTooltip && (
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none"
                      style={{
                        top: 'calc(100% + 8px)',
                        zIndex: 50
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
                        In progress...
                        {/* 위를 가리키는 꼬리 */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '4px solid transparent',
                            borderRight: '4px solid transparent',
                            borderBottom: '4px solid #303A4B'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* 우측: Save 버튼 - customize 페이지일 때만 표시 - 절대 위치로 우측 고정 */}
            {isCustomizePage && (
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
                className="text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  height: '48px',
                  paddingLeft: '24px',
                  paddingRight: '16px',
                  fontSize: '16px',
                  lineHeight: '140%',
                  fontWeight: 600,
                  backgroundColor: '#010820',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#303A4B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#010820';
                }}
              >
                Save
                <Image
                  src="/caret-right.svg"
                  alt="Save"
                  width={20}
                  height={20}
                  style={{ width: '20px', height: '20px' }}
                />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 푸터 - 전체 페이지 고정 */}
      <div 
        className="text-center pb-4 fixed bottom-0 left-0 right-0 z-50"
        style={{
          fontSize: '12px',
          lineHeight: '130%',
          fontWeight: 400,
          color: '#A0AEC0',
          backgroundColor: 'transparent'
        }}
      >
        © 2025. Redrob. All rights reserved.
      </div>

      {/* 페이지 컨텐츠 */}
      {children}
    </>
  );
}
