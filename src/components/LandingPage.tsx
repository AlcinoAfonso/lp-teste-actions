'use client';

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
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Benefits } from './sections/Benefits';
import { Services } from './sections/Services';
import { Testimonials } from './sections/Testimonials';
import { Steps } from './sections/Steps';
import { Technology } from './sections/Technology';
import { About } from './sections/About';
import { FAQ } from './sections/FAQ';
import { CTAFinal } from './sections/CTAFinal';
import { Footer } from './sections/Footer';

interface LandingPageProps {
  data: LandingPageData;
}

type SectionComponent =
  | typeof Header
  | typeof Hero
  | typeof Benefits
  | typeof Services
  | typeof Testimonials
  | typeof Steps
  | typeof Technology
  | typeof About
  | typeof FAQ
  | typeof CTAFinal
  | typeof Footer;

const sectionComponents: Record<SectionData['type'], SectionComponent> = {
  header: Header,
  hero: Hero,
  benefits: Benefits,
  services: Services,
  testimonials: Testimonials,
  steps: Steps,
  technology: Technology,
  about: About,
  faq: FAQ,
  ctaFinal: CTAFinal,
  footer: Footer,
};

export function LandingPage({ data }: LandingPageProps) {
  return (
    <>
      {data.sections.map((section) => {
        const Component = sectionComponents[section.type];
        if (!Component) return null;

        switch (section.type) {
          case 'header':
            return <Header key={section.id} data={section as HeaderData} />;
          case 'hero':
            return <Hero key={section.id} data={section as HeroData} />;
          case 'benefits':
            return <Benefits key={section.id} data={section as BenefitsData} />;
          case 'services':
            return <Services key={section.id} data={section as ServicesData} />;
          case 'testimonials':
            return <Testimonials key={section.id} data={section as TestimonialsData} />;
          case 'steps':
            return <Steps key={section.id} data={section as StepsData} />;
          case 'technology':
            return <Technology key={section.id} data={section as TechnologyData} />;
          case 'about':
            return <About key={section.id} data={section as AboutData} />;
          case 'faq':
            return <FAQ key={section.id} data={section as FAQData} />;
          case 'ctaFinal':
            return <CTAFinal key={section.id} data={section as CTAFinalData} />;
          case 'footer':
            return <Footer key={section.id} data={section as FooterData} />;
          default:
            return null;
        }
      })}
    </>
  );
}
