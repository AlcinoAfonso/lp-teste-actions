import { cn } from '@/lib/utils';
import { BenefitsData } from '@/types/lp-config';
import { sectionDefaults } from '@/config/sections';
import { typography } from '@/config/typography';

interface BenefitsProps {
  data: BenefitsData;
}

export function Benefits({ data }: BenefitsProps) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  return (
    <section className={sectionDefaults.benefits.classes} style={sectionStyle}>
      <div className={sectionDefaults.benefits.container}>
        {/* Título centralizado */}
        <div className={sectionDefaults.benefits.titleContainer}>
          <h2
            className={cn(typography.sectionTitle.classes)}
            style={{ color: data.textColor }}
          >
            {data.title}
          </h2>
        </div>

        {/* Grid de benefícios */}
        <div className={sectionDefaults.benefits.grid}>
          {data.items.map((item, index) => (
            <div key={index} className={sectionDefaults.benefits.cardContainer}>
              {/* Ícone */}
              <div className={sectionDefaults.benefits.iconContainer}>{item.icon}</div>

              {/* Título H3 */}
              <h3
                className={cn(typography.sectionSubtitle.classes)}
                style={{ color: data.textColor }}
              >
                {item.title}
              </h3>

              {/* Descrição */}
              <p
                className={cn(typography.bodyText.classes)}
                style={{ color: data.textColor }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
