Import React from 'react';
import React from 'react';
import Image from 'next/image';
import { AboutData } from '@/types/lp-config';

interface AboutProps {
  data: AboutData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const hasImage = data.image !== undefined;
  
  return (
    <section
      id={data.id}
      className="py-16 lg:py-24"
      style={{
        backgroundColor: data.backgroundColor,
        color: data.textColor,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {hasImage && (
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={data.image!.src}
                alt={data.image!.alt}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className={hasImage ? '' : 'md:col-span-2 max-w-3xl mx-auto text-center'}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {data.title}
            </h2>
            
            {data.subtitle && (
              <p className="text-xl mb-6 opacity-90">
                {data.subtitle}
              </p>
            )}
            
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-line">
                {data.content}
              </p>
            </div>
            
            {data.stats && data.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {data.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm opacity-80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {data.button && (
              <div className="mt-8">
                
                  href={data.button.href}
                  className="inline-block px-6 py-3 rounded-lg font-semibold transition-all bg-primary text-white hover:bg-primary-dark"
                >
                  {data.button.text}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
