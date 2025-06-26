// Base types
export interface BaseSection {
  id: string;
  type: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface ImageData {
  src: string;
  alt: string;
}

export interface ButtonData {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

// Logo types
export interface ImageLogo {
  type: 'image';
  src: string;
  alt: string;
}

export interface TextLogo {
  type: 'text';
  text: string;
}

export type LogoData = ImageLogo | TextLogo;

// Type guard function
export function isTextLogo(logo: LogoData): logo is TextLogo {
  return logo.type === 'text';
}

// Header Section
export interface HeaderData extends BaseSection {
  type: 'header';
  logo: LogoData;
  navigation: {
    text: string;
    href: string;
  }[];
  button?: ButtonData;
}

// Hero Section
export interface HeroData extends BaseSection {
  type: 'hero';
  title: string;
  description: string;
  primaryButton: ButtonData;
  secondaryButton?: ButtonData;
  image: ImageData;
}

// Benefits Section
export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface BenefitsData extends BaseSection {
  type: 'benefits';
  title: string;
  items: BenefitItem[];
}

// Services Section
export interface ServiceItem {
  icon: string;
  text: string;
}

export interface ServicesData extends BaseSection {
  type: 'services';
  title: string;
  items: ServiceItem[];
  image: ImageData;
  button?: ButtonData;
}

// FAQ Section
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqData extends BaseSection {
  type: 'faq';
  title: string;
  items: FaqItem[];
}

// CTA Section
export interface CtaData extends BaseSection {
  type: 'cta';
  title: string;
  description?: string;
  button: ButtonData;
}

// Gallery Section
export interface GalleryData extends BaseSection {
  type: 'gallery';
  title: string;
  subtitle?: string;
  images: ImageData[];
}

// Pricing Section
export interface PricingData extends BaseSection {
  type: 'pricing';
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
}

export interface PricingPlan {
  name: string;
  price: string;
  currency: string;
  period: string;
  featured?: boolean;
  features: string[];
  button: ButtonData;
}

// Contact Section
export interface ContactData extends BaseSection {
  type: 'contact';
  title: string;
  subtitle?: string;
  formAction: string;
  fields: FormField[];
  submitButton: ButtonData;
  info?: ContactInfo[];
}

export interface FormField {
  type: 'text' | 'email' | 'tel' | 'textarea';
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
}

// Footer Section
export interface FooterData extends BaseSection {
  type: 'footer';
  companyName: string;
  description?: string;
  links?: {
    title: string;
    items: {
      text: string;
      href: string;
    }[];
  }[];
  socialLinks?: {
    platform: string;
    href: string;
    icon?: string;
  }[];
}

// Union type for all sections
export type Section = 
  | HeaderData
  | HeroData 
  | BenefitsData 
  | ServicesData 
  | FaqData 
  | CtaData
  | GalleryData
  | PricingData
  | ContactData
  | FooterData;

// Alias for backward compatibility
export type SectionData = Section;

// Landing page structure
export interface LandingPageData {
  metadata: {
    title: string;
    description: string;
    favicon?: string;
  };
  sections: Section[];
}
