import type { Metadata } from 'next'
import './globals.css'
import GlobalLayout from '@/components/GlobalLayout'

export const metadata: Metadata = {
  title: 'REDROB Avatar Creator',
  description: 'Create your custom avatar',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body style={{ backgroundColor: '#FFFFFF' }}>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  )
}

