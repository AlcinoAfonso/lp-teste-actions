import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HeroData } from '@/types/lp-config';
import { Button } from '@/components/ui/Button';
import { sectionDefaults } from '@/config/sections';
import { typography } from '@/config/typography';

interface HeroProps {
  data: HeroData;
}

export function Hero({ data }: HeroProps) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  return (
    <section className={sectionDefaults.hero.classes} style={sectionStyle}>
      <div className={sectionDefaults.hero.container}>
        <div className={sectionDefaults.hero.grid}>
          {/* Text Column */}
          <div className={sectionDefaults.hero.textColumn}>
            <h1 
              className={cn(typography.heroTitle.classes)}
              style={{ color: data.textColor }}
            >
              {data.title}
            </h1>
            <p 
              className={cn(typography.heroDescription.classes)}
              style={{ color: data.textColor }}
            >
              {data.description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button {...data.primaryButton} />
              {data.secondaryButton && (
                <Button {...data.secondaryButton} />
              )}
            </div>
          </div>

          {/* Image Column */}
          <div className={sectionDefaults.hero.imageColumn}>
            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
