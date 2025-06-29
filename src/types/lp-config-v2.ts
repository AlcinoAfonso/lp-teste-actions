// ==========================================
// PARTE 1: NOVA TIPAGEM PARA SISTEMA FLEXÍVEL
// ==========================================
// Arquivo: src/types/lp-config-v2.ts

// ==========================================
// TIPOS BASE
// ==========================================

export interface BaseSection {
  id: string;
  type: string;
  enabled: boolean;
  backgroundColor?: string;
  textColor?: string;
  modo: 'copy_pronta' | 'ai_generate';
  contexto_ia?: string;
}

// ==========================================
// CONFIGURAÇÃO GLOBAL DA LP
// ==========================================

export interface LPGlobalData {
  // Dados básicos
  empresa: string;
  produto_servico: string;
  segmento: string;
  regiao_atuacao: string;
  objetivo_lp: string;
  diferencial_exclusivo: string;
  proposta_valor: string;
  garantias: string;
  etapa_funil: string;
  tagline: string;

  // SEO
  meta_title: string;
  meta_description: string;
  favicon: string;

  // Visual
  logo_url: string;
  cores: {
    logotipo: {
      azul_escuro: string;
      branco: string;
    };
    outras: {
      laranja: string;
    };
  };

  // Links globais
  whatsapp: {
    numero: string;
    rotulo_padrao: string;
    mensagem_padrao: string;
  };
  instagram_url: string;
  termo_uso: {
    url: string;
    texto: string;
  };
}

// ==========================================
// CONFIGURAÇÃO POR SEÇÃO
// ==========================================

// Header Section
export interface HeaderSectionData extends BaseSection {
  type: 'header';
  logo_url: string;
  navegacao: Array<{
    nome: string;
    link: string;
  }>;
  telefone: {
    exibicao: string;
    link: string;
  };
}

// Hero Section
export interface HeroSectionData extends BaseSection {
  type: 'hero';
  h1: string;
  paragrafo: string;
  botao_whatsapp: {
    rotulo: string;
    numero: string;
    mensagem: string;
  };
  imagem_url: string;
}

// Benefits Section (IA)
export interface BenefitsSectionData extends BaseSection {
  type: 'benefits';
  h2?: string;
  items?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

// Services Section
export interface ServicesSectionData extends BaseSection {
  type: 'services';
  h2: string;
  items: Array<{
    icon: string;
    texto: string;
  }>;
  imagem_url: string;
  botao_whatsapp: {
    rotulo: string;
    numero: string;
    mensagem: string;
  };
}

// Testimonials Section
export interface TestimonialsSectionData extends BaseSection {
  type: 'testimonials';
  h2: string;
  youtube_links: string[];
  botao_whatsapp: {
    rotulo: string;
    numero: string;
    mensagem: string;
  };
}

// Steps Section
export interface StepsSectionData extends BaseSection {
  type: 'steps';
  h2: string;
  steps: Array<{
    h3: string;
    descricao: string;
  }>;
  botao_whatsapp: {
    rotulo: string;
    numero: string;
    mensagem: string;
  };
}

// About Section
export interface AboutSectionData extends BaseSection {
  type: 'about';
  h2: string;
  texto: string;
  imagem_url: string;
}

// FAQ Section (IA)
export interface FAQSectionData extends BaseSection {
  type: 'faq';
  h2?: string;
  items?: Array<{
    question: string;
    answer: string;
  }>;
}

// CTA Final Section
export interface CTAFinalSectionData extends BaseSection {
  type: 'ctaFinal';
  h2: string;
  h3: string;
  botao_whatsapp: {
    rotulo: string;
    numero: string;
    mensagem: string;
  };
}

// Footer Section
export interface FooterSectionData extends BaseSection {
  type: 'footer';
  instagram_url: string;
  copyright: string;
  termo_uso: {
    url: string;
    texto: string;
  };
}

// ==========================================
// UNION TYPE DE TODAS AS SEÇÕES
// ==========================================

export type SectionData =
  | HeaderSectionData
  | HeroSectionData
  | BenefitsSectionData
  | ServicesSectionData
  | TestimonialsSectionData
  | StepsSectionData
  | AboutSectionData
  | FAQSectionData
  | CTAFinalSectionData
  | FooterSectionData;

// ==========================================
// CONFIGURAÇÃO FINAL DA LP
// ==========================================

export interface LandingPageConfigV2 {
  // Metadados
  metadata: {
    title: string;
    description: string;
    favicon: string;
  };

  // Dados globais (usados em múltiplas seções)
  global_data: LPGlobalData;

  // Seções da LP
  sections: SectionData[];

  // Info de criação
  creation_info: {
    cliente: string;
    lp_nome: string;
    data_criacao: string;
    modo_criacao: 'manual' | 'brief_estruturado';
  };
}

// ==========================================
// BRIEF ESTRUTURADO (INPUT)
// ==========================================

export interface BriefEstruturado {
  // Info básica
  cliente: string;
  lp_nome: string;

  // Dados globais
  dados_globais: LPGlobalData;

  // Configuração das seções
  secoes: Array<{
    tipo: string;
    habilitada: boolean;
    modo: 'copy_pronta' | 'ai_generate';
    dados?: any;
    contexto_ia?: string;
  }>;
}

// ==========================================
// HELPERS E UTILITÁRIOS
// ==========================================

// Type Guards
export function isHeaderSection(section: SectionData): section is HeaderSectionData {
  return section.type === 'header';
}

export function isHeroSection(section: SectionData): section is HeroSectionData {
  return section.type === 'hero';
}

export function isBenefitsSection(section: SectionData): section is BenefitsSectionData {
  return section.type === 'benefits';
}

export function isServicesSection(section: SectionData): section is ServicesSectionData {
  return section.type === 'services';
}

export function isTestimonialsSection(section: SectionData): section is TestimonialsSectionData {
  return section.type === 'testimonials';
}

export function isStepsSection(section: SectionData): section is StepsSectionData {
  return section.type === 'steps';
}

export function isAboutSection(section: SectionData): section is AboutSectionData {
  return section.type === 'about';
}

export function isFAQSection(section: SectionData): section is FAQSectionData {
  return section.type === 'faq';
}

export function isCTAFinalSection(section: SectionData): section is CTAFinalSectionData {
  return section.type === 'ctaFinal';
}

export function isFooterSection(section: SectionData): section is FooterSectionData {
  return section.type === 'footer';
}

// Validador de seções obrigatórias
export function validateRequiredSections(sections: SectionData[]): boolean {
  const requiredTypes: string[] = ['header', 'hero', 'footer'];
  const presentTypes: string[] = sections.map((s) => s.type);

  return requiredTypes.every((type) => presentTypes.includes(type));
}

// Gerador de slug da LP
export function generateLPSlug(cliente: string, lpNome: string): string {
  const cleanCliente = cliente.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const cleanLPNome = lpNome.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `${cleanCliente}-${cleanLPNome}`;
}
