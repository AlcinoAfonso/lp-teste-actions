// ==========================================
// PARTE 2: PROCESSADOR DE BRIEF E GERADOR DE LP
// ==========================================
// Arquivo: src/lib/brief-processor.ts

import {
  BriefEstruturado,
  LandingPageConfigV2,
  SectionData,
  HeaderSectionData,
  HeroSectionData,
  BenefitsSectionData,
  ServicesSectionData,
  TestimonialsSectionData,
  StepsSectionData,
  AboutSectionData,
  FAQSectionData,
  CTAFinalSectionData,
  FooterSectionData,
  generateLPSlug,
} from '@/types/lp-config-v2';

// ==========================================
// PARSER DE BRIEF ESTRUTURADO
// ==========================================

export class BriefParser {
  /**
   * Converte brief de texto estruturado para objeto tipado
   */
  static parseBriefFromText(briefText: string): BriefEstruturado {
    const lines = briefText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line);

    const brief: BriefEstruturado = {
      cliente: '',
      lp_nome: '',
      dados_globais: {
        empresa: '',
        produto_servico: '',
        segmento: '',
        regiao_atuacao: '',
        objetivo_lp: '',
        diferencial_exclusivo: '',
        proposta_valor: '',
        garantias: '',
        etapa_funil: '',
        tagline: '',
        meta_title: '',
        meta_description: '',
        favicon: '',
        logo_url: '',
        cores: {
          logotipo: { azul_escuro: '', branco: '' },
          outras: { laranja: '' },
        },
        whatsapp: { numero: '', rotulo_padrao: '', mensagem_padrao: '' },
        instagram_url: '',
        termo_uso: { url: '', texto: '' },
      },
      secoes: [],
    };

    let currentSection = '';
    let sectionData: any = {};

    for (const line of lines) {
      // Detecta início de nova seção
      if (
        line.toLowerCase().includes('seção') ||
        [
          'header',
          'hero',
          'benefits',
          'services',
          'testimonials',
          'steps',
          'about',
          'faq',
          'ctafinal',
          'footer',
        ].some((section) => line.toLowerCase() === section)
      ) {
        // Salva seção anterior se existe
        if (currentSection && Object.keys(sectionData).length > 0) {
          brief.secoes.push({
            tipo: currentSection,
            habilitada: true,
            modo: sectionData.modo || 'copy_pronta',
            dados: sectionData,
            contexto_ia: sectionData.contexto_ia,
          });
        }

        // Inicia nova seção
        currentSection = this.extractSectionType(line);
        sectionData = {};
        continue;
      }

      // Processa linha baseado na seção atual
      if (currentSection) {
        this.parseLineForSection(line, sectionData);
      } else {
        // Processa dados globais
        this.parseGlobalData(line, brief.dados_globais);
      }
    }

    // Salva última seção
    if (currentSection && Object.keys(sectionData).length > 0) {
      brief.secoes.push({
        tipo: currentSection,
        habilitada: true,
        modo: sectionData.modo || 'copy_pronta',
        dados: sectionData,
        contexto_ia: sectionData.contexto_ia,
      });
    }

    return brief;
  }

  private static extractSectionType(line: string): string {
    const cleanLine = line.toLowerCase().replace(/seção|:/g, '').trim();

    const sectionMap: { [key: string]: string } = {
      header: 'header',
      hero: 'hero',
      benefits: 'benefits',
      services: 'services',
      testimonials: 'testimonials',
      steps: 'steps',
      about: 'about',
      faq: 'faq',
      ctafinal: 'ctaFinal',
      footer: 'footer',
    };

    return sectionMap[cleanLine] || cleanLine;
  }

  private static parseLineForSection(line: string, sectionData: any) {
    // Detecta se é seção IA
    if (line.toLowerCase().trim() === 'ia') {
      sectionData.modo = 'ai_generate';
      sectionData.contexto_ia = 'Gerar conteúdo apropriado para esta seção';
      return;
    }

    // Parse de diferentes tipos de dados
    if (line.includes('H1:')) {
      sectionData.h1 = line.replace('H1:', '').trim();
    } else if (line.includes('H2:')) {
      sectionData.h2 = line.replace('H2:', '').trim();
    } else if (line.includes('H3:')) {
      if (!sectionData.steps) sectionData.steps = [];
      sectionData.steps.push({
        h3: line.replace('H3:', '').trim(),
        descricao: '',
      });
    } else if (line.includes('P:')) {
      sectionData.paragrafo = line.replace('P:', '').trim();
    } else if (line.includes('Imagem:')) {
      sectionData.imagem_url = line.replace('Imagem:', '').trim();
    } else if (line.includes('Logo (URL):')) {
      sectionData.logo_url = line.replace('Logo (URL):', '').trim();
    } else if (line.includes('Menu') && line.includes('nome:')) {
      if (!sectionData.navegacao) sectionData.navegacao = [];
      const nome = line.split('nome:')[1].trim();
      sectionData.navegacao.push({ nome, link: '' });
    } else if (line.includes('Menu') && line.includes('link:')) {
      if (sectionData.navegacao && sectionData.navegacao.length > 0) {
        const link = line.split('link:')[1].trim();
        sectionData.navegacao[sectionData.navegacao.length - 1].link = link;
      }
    } else if (line.includes('youtube.com/watch')) {
      if (!sectionData.youtube_links) sectionData.youtube_links = [];
      sectionData.youtube_links.push(line.trim());
    } else if (
      line.startsWith('🧠') ||
      line.startsWith('⚖️') ||
      line.startsWith('🔄') ||
      line.startsWith('🌱')
    ) {
      if (!sectionData.items) sectionData.items = [];
      const icon = line.charAt(0);
      const texto = line.substring(1).trim();
      sectionData.items.push({ icon, texto });
    }
    // Adicionar mais parsers conforme necessário...
  }

  private static parseGlobalData(line: string, globalData: any) {
    if (line.includes('Empresa:')) {
      globalData.empresa = line.replace('Empresa:', '').trim();
    } else if (line.includes('Produto ou Serviço:')) {
      globalData.produto_servico = line
        .replace('Produto ou Serviço:', '')
        .trim();
    } else if (line.includes('Objetivo da LP:')) {
      globalData.objetivo_lp = line.replace('Objetivo da LP:', '').trim();
    }
    // Adicionar mais parsers para dados globais...
  }
}

// ==========================================
// GERADOR DE LP
// ==========================================

export class LPGenerator {
  /**
   * Converte brief estruturado para configuração final da LP
   */
  static async generateLP(brief: BriefEstruturado): Promise<LandingPageConfigV2> {
    const sections: SectionData[] = [];

    // Processa cada seção do brief
    for (const secaoConfig of brief.secoes) {
      if (!secaoConfig.habilitada) continue;

      let sectionData: SectionData;

      if (secaoConfig.modo === 'ai_generate') {
        // Seção precisa ser gerada pela IA
        sectionData = await this.generateAISection(
          secaoConfig.tipo,
          secaoConfig.contexto_ia || '',
          brief.dados_globais,
        );
      } else {
        // Seção com copy pronta
        sectionData = this.createSectionFromData(
          secaoConfig.tipo,
          secaoConfig.dados,
          brief.dados_globais,
        );
      }

      sections.push(sectionData);
    }

    // Monta configuração final
    const lpConfig: LandingPageConfigV2 = {
      metadata: {
        title:
          brief.dados_globais.meta_title ||
          `${brief.dados_globais.empresa} - ${brief.dados_globais.produto_servico}`,
        description:
          brief.dados_globais.meta_description ||
          `${brief.dados_globais.proposta_valor}`,
        favicon: brief.dados_globais.favicon || '/favicon.ico',
      },
      global_data: brief.dados_globais,
      sections: sections,
      creation_info: {
        cliente: brief.cliente,
        lp_nome: brief.lp_nome,
        data_criacao: new Date().toISOString(),
        modo_criacao: 'brief_estruturado',
      },
    };

    return lpConfig;
  }

  /**
   * Gera seção usando IA (placeholder - aqui você usaria Claude)
   */
  private static async generateAISection(
    tipo: string,
    contexto: string,
    globalData: any,
  ): Promise<SectionData> {
    // PLACEHOLDER: Aqui você faria chamada para Claude
    // Por agora, retorna seção com dados básicos

    const baseSection = {
      id: tipo,
      type: tipo,
      enabled: true,
      modo: 'ai_generate' as const,
      contexto_ia: contexto,
    };

    switch (tipo) {
      case 'benefits':
        return {
          ...baseSection,
          type: 'benefits',
          h2: 'Benefícios Principais',
          items: [
            {
              icon: '🎯',
              title: 'Resultado Rápido',
              description: 'Veja resultados em poucos dias',
            },
            {
              icon: '⚡',
              title: 'Método Eficaz',
              description: 'Técnica comprovada e segura',
            },
            {
              icon: '🚀',
              title: 'Suporte Total',
              description: 'Acompanhamento completo',
            },
          ],
        } as BenefitsSectionData;

      case 'faq':
        return {
          ...baseSection,
          type: 'faq',
          h2: 'Perguntas Frequentes',
          items: [
            {
              question: 'Como funciona o tratamento?',
              answer: 'O tratamento utiliza frequências específicas...',
            },
            {
              question: 'Quanto tempo demora?',
              answer: 'Os resultados podem ser percebidos em poucos dias...',
            },
            {
              question: 'É seguro?',
              answer: 'Sim, é completamente seguro e não invasivo...',
            },
          ],
        } as FAQSectionData;

      default:
        throw new Error(`Tipo de seção IA não implementado: ${tipo}`);
    }
  }

  /**
   * Cria seção a partir de dados estruturados
   */
  private static createSectionFromData(
    tipo: string,
    dados: any,
    globalData: any,
  ): SectionData {
    const baseSection = {
      id: tipo,
      type: tipo,
      enabled: true,
      modo: 'copy_pronta' as const,
      backgroundColor: dados.cor_fundo,
      textColor: dados.cor_texto,
    };

    switch (tipo) {
      case 'header':
        return {
          ...baseSection,
          type: 'header',
          logo_url: dados.logo_url || globalData.logo_url,
          navegacao: dados.navegacao || [],
          telefone: {
            exibicao: dados.telefone_exibicao || '',
            link: dados.telefone_link || '',
          },
        } as HeaderSectionData;

      case 'hero':
        return {
          ...baseSection,
          type: 'hero',
          h1: dados.h1 || '',
          paragrafo: dados.paragrafo || '',
          botao_whatsapp: {
            rotulo: dados.botao_whatsapp?.rotulo || globalData.whatsapp.rotulo_padrao,
            numero: dados.botao_whatsapp?.numero || globalData.whatsapp.numero,
            mensagem:
              dados.botao_whatsapp?.mensagem || globalData.whatsapp.mensagem_padrao,
          },
          imagem_url: dados.imagem_url || '',
        } as HeroSectionData;

      case 'services':
        return {
          ...baseSection,
          type: 'services',
          h2: dados.h2 || '',
          items: dados.items || [],
          imagem_url: dados.imagem_url || '',
          botao_whatsapp: {
            rotulo: dados.botao_whatsapp?.rotulo || globalData.whatsapp.rotulo_padrao,
            numero: dados.botao_whatsapp?.numero || globalData.whatsapp.numero,
            mensagem:
              dados.botao_whatsapp?.mensagem || globalData.whatsapp.mensagem_padrao,
          },
        } as ServicesSectionData;

      case 'testimonials':
        return {
          ...baseSection,
          type: 'testimonials',
          h2: dados.h2 || '',
          youtube_links: dados.youtube_links || [],
          botao_whatsapp: {
            rotulo: dados.botao_whatsapp?.rotulo || globalData.whatsapp.rotulo_padrao,
            numero: dados.botao_whatsapp?.numero || globalData.whatsapp.numero,
            mensagem:
              dados.botao_whatsapp?.mensagem || globalData.whatsapp.mensagem_padrao,
          },
        } as TestimonialsSectionData;

      case 'steps':
        return {
          ...baseSection,
          type: 'steps',
          h2: dados.h2 || '',
          steps: dados.steps || [],
          botao_whatsapp: {
            rotulo: dados.botao_whatsapp?.rotulo || globalData.whatsapp.rotulo_padrao,
            numero: dados.botao_whatsapp?.numero || globalData.whatsapp.numero,
            mensagem:
              dados.botao_whatsapp?.mensagem || globalData.whatsapp.mensagem_padrao,
          },
        } as StepsSectionData;

      case 'about':
        return {
          ...baseSection,
          type: 'about',
          h2: dados.h2 || '',
          texto: dados.texto || '',
          imagem_url: dados.imagem_url || '',
        } as AboutSectionData;

      case 'ctaFinal':
        return {
          ...baseSection,
          type: 'ctaFinal',
          h2: dados.h2 || '',
          h3: dados.h3 || '',
          botao_whatsapp: {
            rotulo: dados.botao_whatsapp?.rotulo || globalData.whatsapp.rotulo_padrao,
            numero: dados.botao_whatsapp?.numero || globalData.whatsapp.numero,
            mensagem:
              dados.botao_whatsapp?.mensagem || globalData.whatsapp.mensagem_padrao,
          },
        } as CTAFinalSectionData;

      case 'footer':
        return {
          ...baseSection,
          type: 'footer',
          instagram_url: dados.instagram_url || globalData.instagram_url,
          copyright:
            dados.copyright ||
            `${globalData.empresa} © Todos os Direitos Reservados – ${new Date().getFullYear()}`,
          termo_uso: {
            url: dados.termo_uso?.url || globalData.termo_uso.url,
            texto: dados.termo_uso?.texto || globalData.termo_uso.texto,
          },
        } as FooterSectionData;

      default:
        throw new Error(`Tipo de seção não implementado: ${tipo}`);
    }
  }
}

// ==========================================
// UTILITÁRIOS
// ==========================================

export class LPUtils {
  /**
   * Converte LP Config V2 para formato compatível com componentes existentes
   */
  static convertToLegacyFormat(lpConfig: LandingPageConfigV2): any {
    return {
      metadata: lpConfig.metadata,
      sections: lpConfig.sections.map((section) => ({
        ...section,
        // Mapear campos específicos conforme necessário
      })),
    };
  }

  /**
   * Gera nome do arquivo da LP
   */
  static generateFileName(cliente: string, lpNome: string): string {
    return `${generateLPSlug(cliente, lpNome)}.json`;
  }

  /**
   * Gera path completo da LP
   */
  static generateLPPath(cliente: string, lpNome: string): string {
    const slug = generateLPSlug(cliente, lpNome);
    return `lps/${slug}/`;
  }
}

