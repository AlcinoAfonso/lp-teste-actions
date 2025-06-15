// Tipos base compartilhados
export interface NavItem {
  label: string;
  href: string;
}

export interface Button {
  text: string;
  href: string;
  style?: 'primary' | 'secondary' | 'outline';
}

export interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Tipos das seções
export interface HeaderData {
  logo: {
    text: string;
    subtitle?: string;
  };
  navigation: NavItem[];
  backgroundColor?: string;
}

export interface HeroData {
  title: string;
  description: string;
  primaryButton: Button;
  image: Image;
  backgroundColor?: string;
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
