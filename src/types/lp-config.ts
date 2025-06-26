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

// Section types
export interface HeroData extends BaseSection {
  type: 'hero';
  title: string;
  description: string;
  primaryButton: ButtonData;
  secondaryButton?: ButtonData;
  image: ImageData;
}

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

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqData extends BaseSection {
  type: 'faq';
  title: string;
  items: FaqItem[];
}

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

// Union type for all sections
export type Section = 
  | HeroData 
  | BenefitsData 
  | ServicesData 
  | FaqData 
  | CtaData
  | GalleryData
  | PricingData
  | ContactData;

// Landing page structure
export interface LandingPageData {
  metadata: {
    title: string;
    description: string;
    favicon?: string;
  };
  sections: Section[];
}
