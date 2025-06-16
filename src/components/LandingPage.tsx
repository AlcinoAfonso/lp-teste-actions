'use client';

import {
  LandingPageData,
  SectionData,
  HeaderData,
  HeroData,
  BenefitsData,
  ServicesData,
} from '@/types/lp-config';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Benefits } from './sections/Benefits';
import { Services } from './sections/Services';

interface LandingPageProps {
  data: LandingPageData;
}

type SectionComponent =
  | typeof Header
  | typeof Hero
  | typeof Benefits
  | typeof Services;

const sectionComponents: Record<SectionData['type'], SectionComponent> = {
  header: Header,
  hero: Hero,
  benefits: Benefits,
  services: Services,
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
          default:
            return null;
        }
      })}
    </>
  );
}
