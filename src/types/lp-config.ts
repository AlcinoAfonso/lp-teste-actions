// Tipos base compartilhados
export interface NavItem {
  label: string;
  href: string;
}

export interface Button {
  text: string;
  href: string;
  style?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  backgroundColor?: string;
  textColor?: string;
}

export interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Tipo para logo (pode ser texto ou imagem)
export type Logo =
  | {
      text: string;
      subtitle?: string;
    }
  | {
      src: string;
      alt: string;
    };

// Tipos das seções
export interface HeaderData {
  logo: Logo;
  navigation: NavItem[];
  phone?: {
    display: string;
    link: string;
  };
  backgroundColor?: string;
  textColor?: string;
}

export interface HeroData {
  title: string;
  description: string;
  primaryButton: Button;
  secondaryButton?: Button;
  image: Image;
  backgroundColor?: string;
  textColor?: string;
}

// União dos tipos de dados das seções
export type SectionData = HeaderData | HeroData;

// Tipo da seção
export interface Section {
  type: 'header' | 'hero';
  enabled?: boolean;
  data: SectionData;
}

// Tipo principal do arquivo lp.json
export interface LPConfig {
  metadata: {
    title: string;
    description: string;
    keywords?: string;
    favicon?: string;
    ogImage?: string;
  };
  sections: Section[];
}

// Type guards para verificar tipo de logo
export function isTextLogo(logo: Logo): logo is { text: string; subtitle?: string } {
  return 'text' in logo;
}

export function isImageLogo(logo: Logo): logo is { src: string; alt: string } {
  return 'src' in logo && 'alt' in logo;
}
