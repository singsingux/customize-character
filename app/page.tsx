'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CharacterPreview from '@/components/CharacterPreview';
import { generateRandomCharacter } from '@/lib/randomizer';
import { CharacterAttributes } from '@/types/character';

export default function Home() {
  const router = useRouter();
  
  // 랜덤 캐릭터 12개 생성 (무한 스크롤 효과를 위해)
  const [randomCharacters, setRandomCharacters] = useState<CharacterAttributes[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 640);
    
    // 12개의 랜덤 캐릭터 생성
    const characters = Array.from({ length: 12 }, () => generateRandomCharacter());
    setRandomCharacters(characters);
    
    // 리사이즈 이벤트 핸들러
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStartClick = () => {
    router.push('/customize');
  };

  return (
    <main 
      className="h-screen flex flex-col overflow-hidden relative fade-in"
      style={{ 
        height: '100vh',
        maxHeight: '-webkit-fill-available'
      }}
    >
      {/* 중앙 컨텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 relative z-10" style={{ paddingTop: '88px' }}>
        <div className="text-center max-w-4xl">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              lineHeight: '120%',
              letterSpacing: '-0.02em',
              fontWeight: 700,
              color: '#010820',
              marginBottom: '24px'
            }}
          >
            Wanted: Redrob's<br />Robbers Mugshot Lab
          </h1>
          <p 
            className="text-base sm:text-lg"
            style={{
              lineHeight: '120%',
              fontWeight: 400,
              color: '#718096',
              marginBottom: '40px'
            }}
          >
            Create your best look—it's mugshot o'clock!
          </p>

          {/* CTA 버튼 */}
          <button 
            onClick={handleStartClick}
            className="text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center mx-auto"
            style={{
              paddingTop: '16px',
              paddingBottom: '16px',
              paddingLeft: '24px',
              paddingRight: '24px',
              fontSize: '16px',
              lineHeight: '140%',
              fontWeight: 600,
              backgroundColor: '#010820',
              gap: '8px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#303A4B'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#010820'}
          >
            Get Started
            <Image 
              src="/plus-icon.svg" 
              alt="Plus" 
              width={20}
              height={20}
              style={{ width: '20px', height: '20px' }}
            />
          </button>
        </div>
      </div>

      {/* 하단 무한 배너 */}
      {isClient && randomCharacters.length > 0 && (
        <div className="w-full pb-8 sm:pb-12 relative z-10 overflow-hidden">
          <div 
            className="flex gap-4 sm:gap-8"
            style={{
              animation: 'scroll-banner 80s linear infinite',
              width: 'fit-content'
            }}
          >
            {/* 무한 스크롤을 위해 배열을 4번 반복 */}
            {[...randomCharacters, ...randomCharacters, ...randomCharacters, ...randomCharacters].map((character, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 rounded-full flex items-center justify-center"
                style={{ 
                  width: isMobile ? '200px' : '300px', 
                  height: isMobile ? '200px' : '300px',
                  backgroundColor: character.background.color,
                  overflow: 'hidden'
                }}
              >
                <CharacterPreview character={character} size={isMobile ? 200 : 300} />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

