// Edited by Codex
import { LandingPageData } from '@/types/lp-config';
import fs from 'fs/promises';
import path from 'path';

export async function getFunnelTemplate(etapa: 'tofu' | 'mofu' | 'bofu'): Promise<LandingPageData | null> {
  try {
    const templatePath = path.join(process.cwd(), 'templates', 'bases', `${etapa}.json`);
    const templateContent = await fs.readFile(templatePath, 'utf8');
    return JSON.parse(templateContent) as LandingPageData;
  } catch (error) {
    console.error(`Erro ao carregar template ${etapa}:`, error);
    return null;
  }
}

export function processTemplate(template: LandingPageData, data: Record<string, any>): LandingPageData {
  // Converte o template em string para fazer replace
  let templateStr = JSON.stringify(template);

  // Substitui todas as variáveis {{variavel}} pelos dados
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    templateStr = templateStr.replace(regex, String(value));
  });

  // Remove variáveis não substituídas (opcional)
  templateStr = templateStr.replace(/{{[^}]+}}/g, '');

  return JSON.parse(templateStr) as LandingPageData;
}

// Função para criar LP automaticamente
export async function createClientLP(
  cliente: string,
  etapas: ('tofu' | 'mofu' | 'bofu')[],
  clientData: Record<string, any>
) {
  const results = [] as Array<{ slug: string; etapa: string; success: boolean; url?: string; error?: string }>;

  for (const etapa of etapas) {
    try {
      // Carrega template da etapa
      const template = await getFunnelTemplate(etapa);
      if (!template) continue;

      // Processa template com dados do cliente
      const processedLP = processTemplate(template, clientData);

      // Cria diretório
      const lpDir = path.join(process.cwd(), 'lps', `${cliente}-${etapa}`);
      await fs.mkdir(lpDir, { recursive: true });

      // Salva LP processada
      const lpPath = path.join(lpDir, 'lp.json');
      await fs.writeFile(lpPath, JSON.stringify(processedLP, null, 2));

      // Cria README
      const readmePath = path.join(lpDir, 'README.md');
      const readmeContent = `# Landing Page - ${cliente}-${etapa}

Criada em: ${new Date().toISOString()}
Etapa do Funil: ${etapa.toUpperCase()}
Cliente: ${cliente}

## Arquivos
- \`lp.json\`: Configuração da landing page

## URLs
- Produção: https://seusite.com/${cliente}-${etapa}
- Desenvolvimento: http://localhost:3000/${cliente}-${etapa}

## Preço
- ${getEtapaPrice(etapa)}

## Deploy
Esta LP será automaticamente deployada pela Vercel.
`;
      await fs.writeFile(readmePath, readmeContent);

      results.push({
        slug: `${cliente}-${etapa}`,
        etapa,
        success: true,
        url: `/${cliente}-${etapa}`,
      });
    } catch (error: any) {
      results.push({
        slug: `${cliente}-${etapa}`,
        etapa,
        success: false,
        error: error.message,
      });
    }
  }

  return results;
}

function getEtapaPrice(etapa: string): string {
  const prices: Record<string, string> = {
    tofu: 'R$ 297',
    mofu: 'R$ 397',
    bofu: 'R$ 497',
  };
  return prices[etapa] || 'R$ 0';
}
