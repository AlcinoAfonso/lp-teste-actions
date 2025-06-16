import { cn } from '@/lib/utils';
import { CTAFinalData } from '@/types/lp-config';
import { Button } from '@/components/ui/Button';
import { sectionDefaults } from '@/config/sections';
import { typography } from '@/config/typography';

interface CTAFinalProps {
  data: CTAFinalData;
}

export function CTAFinal({ data }: CTAFinalProps) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  return (
    <section className={sectionDefaults.ctaFinal.classes} style={sectionStyle}>
      <div className={sectionDefaults.ctaFinal.container}>
        <div className={sectionDefaults.ctaFinal.contentContainer}>
          <h2
            className={cn(typography.heroTitle.classes)}
            style={{ color: data.textColor }}
          >
            {data.title}
          </h2>
          <h3
            className={cn(typography.heroDescription.classes)}
            style={{ color: data.textColor }}
          >
            {data.subtitle}
          </h3>
          <Button {...data.button} />
        </div>
      </div>
    </section>
  );
}
