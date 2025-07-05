// Edited by Codex
export interface FunnelPricing {
  tofu: number;
  mofu: number;
  bofu: number;
  package: number; // Desconto no pacote completo
}

export interface ClientOrder {
  cliente: string;
  etapas: ('tofu' | 'mofu' | 'bofu')[];
  total: number;
  discount?: number;
}

export const funnelPricing: FunnelPricing = {
  tofu: 297,
  mofu: 397,
  bofu: 497,
  package: 797, // Preço do pacote completo (economia de R$ 294)
};

export function calculateOrder(etapas: ('tofu' | 'mofu' | 'bofu')[]): {
  individual: number;
  package: number;
  savings: number;
  recommendPackage: boolean;
} {
  const individual = etapas.reduce((sum, etapa) => sum + funnelPricing[etapa], 0);
  const packagePrice = funnelPricing.package;
  const savings = individual - packagePrice;
  const recommendPackage = etapas.length >= 2 && savings > 0;

  return {
    individual,
    package: packagePrice,
    savings,
    recommendPackage,
  };
}

export function getEtapaDescription(etapa: 'tofu' | 'mofu' | 'bofu'): {
  name: string;
  description: string;
  price: number;
  goal: string;
} {
  const descriptions = {
    tofu: {
      name: 'TOFU - Captura de Leads',
      description: 'Landing page para capturar leads com materiais educativos',
      price: funnelPricing.tofu,
      goal: 'Gerar consciência e capturar contatos',
    },
    mofu: {
      name: 'MOFU - Nutrição',
      description: 'Landing page para nutrir leads com webinars e conteúdo avançado',
      price: funnelPricing.mofu,
      goal: 'Educar e qualificar leads',
    },
    bofu: {
      name: 'BOFU - Vendas',
      description: 'Landing page de vendas com foco em conversão',
      price: funnelPricing.bofu,
      goal: 'Converter leads em clientes',
    },
  } as const;

  return descriptions[etapa];
}
