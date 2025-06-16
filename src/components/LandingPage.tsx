'use client';

import { LandingPageData } from '@/types/lp-config';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Benefits } from './sections/Benefits';
import { Services } from './sections/Services';

interface LandingPageProps {
  data: LandingPageData;
}

const sectionComponents = {
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

        return <Component key={section.id} data={section as any} />;
      })}
    </>
  );
}
