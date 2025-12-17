/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // EMFILE 에러 방지를 위한 실험적 옵션
  experimental: {
    cpus: 1, // CPU 사용 제한으로 파일 감시 부담 감소
  },
  webpack: (config, { isServer, dev }) => {
    // 개발 모드에서만 watchOptions 설정
    if (dev) {
      config.watchOptions = {
        poll: 3000, // 폴링 간격 대폭 증가
        aggregateTimeout: 1000,
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/.git/**',
          '**/public/**',
          '**/*.md',
          '**/.DS_Store',
          '**/terminals/**',
        ],
      }
      
      // 파일 시스템 캐시 활성화
      config.cache = {
        type: 'filesystem',
        allowCollectingMemory: true,
        maxMemoryGenerations: 1,
      }
      
      // 스냅샷 비활성화로 메모리 절약
      config.snapshot = {
        managedPaths: [],
        immutablePaths: [],
      }
    }
    
    return config
  },
}

module.exports = nextConfig

