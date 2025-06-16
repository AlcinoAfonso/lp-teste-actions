export interface LandingPageData {
  metadata: MetaData;
  sections: SectionData[];
}

export interface MetaData {
  title: string;
  description: string;
  favicon?: string;
}

export type SectionData =
  | HeaderData
  | HeroData
  | BenefitsData
  | ServicesData
  | TestimonialsData
  | StepsData
  | TechnologyData
  | AboutData
  | FAQData
  | CTAFinalData
  | FooterData;

export interface BaseSection {
  id: string;
  type:
    | 'header'
    | 'hero'
    | 'benefits'
    | 'services'
    | 'testimonials'
    | 'steps'
    | 'technology'
    | 'about'
    | 'faq'
    | 'ctaFinal'
    | 'footer';
  backgroundColor?: string;
  textColor?: string;
}

export interface HeaderData extends BaseSection {
  type: 'header';
  logo: Logo;
  navigation: NavigationItem[];
  phone?: {
    display: string;
    link: string;
  };
}

export interface HeroData extends BaseSection {
  type: 'hero';
  title: string;
  description: string;
  primaryButton: ButtonData;
  secondaryButton?: ButtonData;
  image: ImageData;
}

export interface BenefitsData extends BaseSection {
  type: 'benefits';
  title: string;
  items: BenefitItem[];
}

export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServicesData extends BaseSection {
  type: 'services';
  title: string;
  items: ServiceItem[];
  image: ImageData;
  button?: ButtonData;
}

export interface ServiceItem {
  icon: string;
  text: string;
}

export interface TestimonialsData extends BaseSection {
  type: 'testimonials';
  title: string;
  videos: VideoEmbed[];
}

export interface VideoEmbed {
  embedUrl: string;
  title?: string;
}

export interface StepsData extends BaseSection {
  type: 'steps';
  title: string;
  steps: StepItem[];
  button: ButtonData;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface TechnologyData extends BaseSection {
  type: 'technology';
  title: string;
  items: TechItem[];
  image: ImageData;
  button: ButtonData;
}

export interface TechItem {
  icon: string;
  title: string;
  description: string;
}

export interface AboutData extends BaseSection {
  type: 'about';
  title: string;
  description: string;
  image: ImageData;
}

export interface FAQData extends BaseSection {
  type: 'faq';
  title: string;
  items: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CTAFinalData extends BaseSection {
  type: 'ctaFinal';
  title: string;
  subtitle: string;
  button: ButtonData;
}

export interface FooterData extends BaseSection {
  type: 'footer';
  instagram: {
    url: string;
    text: string;
  };
  copyright: string;
  legalLink: {
    text: string;
    href: string;
  };
}

export interface ButtonData {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
}

export interface ImageData {
  src: string;
  alt: string;
}

export type Logo = TextLogo | ImageLogo;

export interface TextLogo {
  type: 'text';
  text: string;
  subtitle?: string;
}

export interface ImageLogo {
  type: 'image';
  src: string;
  alt: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export const isTextLogo = (logo: Logo): logo is TextLogo => {
  return logo.type === 'text';
};
