'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface SmoothLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function SmoothLink({ href, children, className, style }: SmoothLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Fade out
    document.body.style.opacity = '0';
    
    setTimeout(() => {
      router.push(href);
      
      // Fade in
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    }, 400);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} style={style}>
      {children}
    </Link>
  );
}

