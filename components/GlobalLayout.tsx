'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // 페이지 확인
  const isSavePage = pathname === '/save';
  const isCustomizePage = pathname === '/customize';
  const isMainPage = pathname === '/';

  // 모바일 여부 확인
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsSmallScreen(window.innerWidth < 680);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.hamburger-menu')) {
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
      {!isSavePage && !isSmallScreen && (
        <div className="w-full px-6 py-4 sm:py-6 fixed top-0 left-0 right-0 z-50" style={{ minHeight: '64px', backgroundColor: 'transparent' }}>
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
                paddingLeft: '16px',
                paddingRight: '16px',
                gap: isMobile ? '16px' : '40px'
              }}
            >
              {/* 로고 (클릭 시 메인으로 이동) */}
              <button 
                onClick={() => handleNavigation('/')}
                className="flex items-center"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
              >
                <Image 
                  src="/logo.svg" 
                  alt="Logo" 
                  width={24}
                  height={24}
                  priority
                  className="block"
                  style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                />
                <div 
                  className="block"
                  style={{
                    width: '1px',
                    height: '24px',
                    backgroundColor: '#EDF2F7',
                    margin: '0 12px'
                  }}
                />
                <span 
                  className="hidden lg:inline"
                  style={{ 
                    color: '#010820',
                    fontSize: '14px',
                    lineHeight: '130%',
                    fontWeight: 500
                  }}
                >
                  Mugshot Lab
                </span>
              </button>
              
              {/* 메뉴 */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => handleNavigation('/')}
                  className="text-sm"
                  style={{
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
                  className="text-sm"
                  style={{
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
                  onTouchStart={() => setShowTooltip(true)}
                  onTouchEnd={() => setTimeout(() => setShowTooltip(false), 2000)}
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
            
            {/* 우측: Save 버튼 - customize 페이지일 때만 표시 - 절대 위치로 우측 고정 - 데스크탑만 */}
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
                className="hidden lg:flex text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl items-center justify-center text-sm lg:text-base w-auto px-4 pr-3"
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  height: '48px',
                  lineHeight: '140%',
                  fontWeight: 600,
                  fontSize: '14px',
                  backgroundColor: '#010820',
                  gap: '6px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#303A4B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#010820';
                }}
              >
                <span>Save</span>
                <Image
                  src="/caret-right.svg"
                  alt="Save"
                  width={16}
                  height={16}
                  style={{ width: '16px', height: '16px' }}
                />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 680px 이하: 햄버거 메뉴 네비게이션 */}
      {!isSavePage && isSmallScreen && (
        <div className="w-full px-6 py-4 fixed top-0 left-0 right-0 z-50 hamburger-menu" style={{ backgroundColor: 'transparent' }}>
          <div className="flex items-center justify-between" style={{ height: '48px' }}>
            {/* 좌측: 로고 + 디바이더 + 문구 (클릭 시 메인으로 이동) */}
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center" 
              style={{ 
                gap: '12px',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer'
              }}
            >
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={24}
                height={24}
                priority
                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
              />
              <div 
                style={{
                  width: '1px',
                  height: '24px',
                  backgroundColor: '#EDF2F7'
                }}
              />
              <span 
                style={{ 
                  color: '#010820',
                  fontSize: '14px',
                  lineHeight: '130%',
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}
              >
                Mugshot Lab
              </span>
            </button>

            {/* 우측: 햄버거 메뉴 */}
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
          </div>

          {/* 드롭다운 메뉴 */}
          {isMenuOpen && (
            <div 
              className="mt-2 rounded-2xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #EDF2F7',
                boxShadow: '0 4px 16px rgba(48, 58, 75, 0.12)',
                overflow: 'hidden'
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

      {/* 푸터 - 메인 페이지에만 표시 */}
      {isMainPage && (
        <div 
          className="text-center pb-4 fixed bottom-0 left-0 right-0 z-50"
          style={{
            fontSize: '12px',
            lineHeight: '130%',
            fontWeight: 400,
            color: '#A0AEC0',
            backgroundColor: 'transparent',
            paddingTop: isMobile ? '16px' : '0'
          }}
        >
          © 2025. Redrob. All rights reserved.
        </div>
      )}

      {/* 페이지 컨텐츠 */}
      {children}
    </>
  );
}