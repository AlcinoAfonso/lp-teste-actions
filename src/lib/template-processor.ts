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
  let templateStr = JSON.stringify(template);

  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    templateStr = templateStr.replace(regex, String(value));
  });

  return JSON.parse(templateStr) as LandingPageData;
}
