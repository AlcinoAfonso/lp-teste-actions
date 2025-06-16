'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HeaderData, isTextLogo, isImageLogo } from '@/types/lp-config';
import { sectionDefaults } from '@/config/sections';
import { typography } from '@/config/typography';

interface HeaderProps {
  data: HeaderData;
}

export function Header({ data }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const containerStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  return (
    <header 
      className={sectionDefaults.header.classes}
      style={containerStyle}
    >
      <div className={sectionDefaults.header.container}>
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {isTextLogo(data.logo) ? (
            <div>
              <div className={cn(typography.logoText.classes)} style={{ color: data.textColor }}>
                {data.logo.text}
              </div>
              {data.logo.subtitle && (
                <div className={cn(typography.logoSubtitle.classes)} style={{ color: data.textColor }}>
                  {data.logo.subtitle}
                </div>
              )}
            </div>
          ) : (
            <Image
              src={data.logo.src}
              alt={data.logo.alt}
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {data.navigation.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={cn(typography.navLink.classes)}
              style={{ color: data.textColor }}
            >
              {item.label}
            </a>
          ))}
          {data.phone && (
            <a
              href={data.phone.link}
              className={cn(typography.navLink.classes, "font-bold")}
              style={{ color: data.textColor }}
            >
              {data.phone.display}
            </a>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          style={{ color: data.textColor }}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden" style={containerStyle}>
          <nav className="container-lp py-4 space-y-4">
            {data.navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block py-2"
                style={{ color: data.textColor }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {data.phone && (
              <a
                href={data.phone.link}
                className="block py-2 font-bold"
                style={{ color: data.textColor }}
              >
                {data.phone.display}
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
