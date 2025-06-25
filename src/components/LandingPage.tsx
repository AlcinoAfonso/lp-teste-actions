'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
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

// Componentes carregados imediatamente (above the fold)
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';

// Componentes com lazy loading (below the fold)
const Benefits = dynamic(() => import('./sections/Benefits').then(mod => ({ default: mod.Benefits })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const Services = dynamic(() => import('./sections/Services').then(mod => ({ default: mod.Services })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const Testimonials = dynamic(() => import('./sections/Testimonials').then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const Steps = dynamic(() => import('./sections/Steps').then(mod => ({ default: mod.Steps })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const Technology = dynamic(() => import('./sections/Technology').then(mod => ({ default: mod.Technology })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const About = dynamic(() => import('./sections/About').then(mod => ({ default: mod.About })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const FAQ = dynamic(() => import('./sections/FAQ').then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true
});

const CTAFinal = dynamic(() => import('./sections/CTAFinal').then(mod => ({ default: mod.CTAFinal })), {
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />,
  ssr: true
});

const Footer = dynamic(() => import('./sections/Footer').then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-32 bg-gray-900 animate-pulse" />,
  ssr: true
});

interface LandingPageProps {
  data: LandingPageData;
}

// Loading skeleton component
function SectionSkeleton() {
  return <div className="h-96 bg-gray-50 animate-pulse" />;
}

export function LandingPage({ data }: LandingPageProps) {
  return (
    <>
      {data.sections.map((section) => {
        // Header e Hero sempre carregam imediatamente
        if (section.type === 'header') {
          return <Header key={section.id} data={section as HeaderData} />;
        }
        
        if (section.type === 'hero') {
          return <Hero key={section.id} data={section as HeroData} />;
        }

        // Demais componentes com lazy loading
        return (
          <Suspense key={section.id} fallback={<SectionSkeleton />}>
            {(() => {
              switch (section.type) {
                case 'benefits':
                  return <Benefits data={section as BenefitsData} />;
                case 'services':
                  return <Services data={section as ServicesData} />;
                case 'testimonials':
                  return <Testimonials data={section as TestimonialsData} />;
                case 'steps':
                  return <Steps data={section as StepsData} />;
                case 'technology':
                  return <Technology data={section as TechnologyData} />;
                case 'about':
                  return <About data={section as AboutData} />;
                case 'faq':
                  return <FAQ data={section as FAQData} />;
                case 'ctaFinal':
                  return <CTAFinal data={section as CTAFinalData} />;
                case 'footer':
                  return <Footer data={section as FooterData} />;
                default:
                  return null;
              }
            })()}
          </Suspense>
        );
      })}
    </>
  );
}
