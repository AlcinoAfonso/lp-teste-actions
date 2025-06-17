import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AboutData } from '@/types/lp-config';
import { sectionDefaults } from '@/config/sections';
import { typography } from '@/config/typography';

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  const sectionStyle = {
    ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
    ...(data.textColor && { color: data.textColor }),
  } as React.CSSProperties;

  return (
    <section id={data.id} className={sectionDefaults.about.classes} style={sectionStyle}>
      <div className={sectionDefaults.about.container}>
        <div className={sectionDefaults.about.layout}>
          <div className={sectionDefaults.about.imageContainer}>
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>

          <div className={sectionDefaults.about.textContainer}>
            <h2
              className={cn(typography.sectionTitle.classes)}
              style={{ color: data.textColor }}
            >
              {data.title}
            </h2>
            <div
              className="space-y-4"
              style={{ color: data.textColor }}
            >
              {data.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className={cn(typography.bodyText.classes, 'mb-0')}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
