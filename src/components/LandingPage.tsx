'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { 
  LandingPageData,
  SectionData,
  HeaderData,
  HeroData,
  BenefitsData,
  ServicesData,
  TestimonialsData,
  StepsData,
  TechnologyData,
  AboutData,
  FAQData,
  CTAFinalData,
  FooterData,
} from '@/types/lp-config';

// Dynamic imports for performance
const Header = dynamic(() => import('./sections/Header'), {
  loading: () => <div className="h-16 bg-white animate-pulse" />,
  ssr: true
});

const Hero = dynamic(() => import('./sections/Hero'), {
  loading: () => <div className="h-screen bg-gray-50 animate-pulse" />,
  ssr: true
});

const Benefits = dynamic(() => import('./sections/Benefits'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
  ssr: true
});

const Services = dynamic(() => import('./sections/Services'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const Testimonials = dynamic(() => import('./sections/Testimonials'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
  ssr: true
});

const FAQ = dynamic(() => import('./sections/FAQ'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const About = dynamic(() => import('./sections/About'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const Steps = dynamic(() => import('./sections/Steps'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
  ssr: true
});

const Technology = dynamic(() => import('./sections/Technology'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const CTAFinal = dynamic(() => import('./sections/CTAFinal'), {
  loading: () => <div className="h-64 bg-primary animate-pulse" />,
  ssr: true
});

const Footer = dynamic(() => import('./sections/Footer'), {
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />,
  ssr: true
});

const Gallery = dynamic(() => import('./sections/Gallery'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
  ssr: true
});

const Pricing = dynamic(() => import('./sections/Pricing'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const Contact = dynamic(() => import('./sections/Contact'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
  ssr: true
});

interface LandingPageProps {
  data: LandingPageData;
}

const LandingPage: React.FC<LandingPageProps> = ({ data }) => {
  const renderSection = (section: SectionData, index: number) => {
    // Type narrowing to handle different section types
    if (section.type === 'header') {
      return <Header key={`${section.type}-${index}`} data={section as HeaderData} />;
    }
    
    // Use switch for other section types
    switch (section.type) {
      case 'hero':
        return <Hero key={`${section.type}-${index}`} data={section as HeroData} />;
      case 'benefits':
        return <Benefits key={`${section.type}-${index}`} data={section as BenefitsData} />;
      case 'services':
        return <Services key={`${section.type}-${index}`} data={section as ServicesData} />;
      case 'testimonials':
        return <Testimonials key={`${section.type}-${index}`} data={section as TestimonialsData} />;
      case 'steps':
        return <Steps key={`${section.type}-${index}`} data={section as StepsData} />;
      case 'technology':
        return <Technology key={`${section.type}-${index}`} data={section as TechnologyData} />;
      case 'about':
        return <About key={`${section.type}-${index}`} data={section as AboutData} />;
      case 'faq':
        return <FAQ key={`${section.type}-${index}`} data={section as FAQData} />;
      case 'ctaFinal':
        return <CTAFinal key={`${section.type}-${index}`} data={section as CTAFinalData} />;
      case 'footer':
        return <Footer key={`${section.type}-${index}`} data={section as FooterData} />;
      case 'gallery':
        return <Gallery key={`${section.type}-${index}`} data={section} />;
      case 'pricing':
        return <Pricing key={`${section.type}-${index}`} data={section} />;
      case 'contact':
        return <Contact key={`${section.type}-${index}`} data={section} />;
      case 'cta':
        return <CTAFinal key={`${section.type}-${index}`} data={section as CTAFinalData} />;
      default:
        console.warn(`Unknown section type: ${(section as any).type}`);
        return null;
    }
  };

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
      <div className="min-h-screen">
        {data.sections.map((section, index) => renderSection(section, index))}
      </div>
    </Suspense>
  );
};

export default LandingPage;
