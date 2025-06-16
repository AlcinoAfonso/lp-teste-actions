import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { LPConfig, HeaderData, HeroData } from '@/types/lp-config';
import { isSectionEnabled } from '@/lib/utils';
import lpData from '../../lp.json';

// Type assertion para o JSON importado
const config = lpData as LPConfig;

export default function Home() {
  return (
    <>
      {config.sections.map((section, index) => {
        if (!isSectionEnabled(section)) return null;

        switch (section.type) {
          case 'header':
            return <Header key={index} data={section.data as HeaderData} />;
          case 'hero':
            return <Hero key={index} data={section.data as HeroData} />;
          default:
            return null;
        }
      })}
    </>
  );
}
