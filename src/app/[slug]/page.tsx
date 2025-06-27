import { notFound } from 'next/navigation';
import LandingPage from '@/components/LandingPage';
import { LandingPageData } from '@/types/lp-config';
import { getFunnelTemplate, processTemplate } from '@/lib/template-processor';
import fs from 'fs/promises';
import path from 'path';

interface PageProps {
  params: {
    slug: string;
  };
}

function parseSlug(slug: string): { cliente: string; etapa: string } | null {
  const parts = slug.split('-');
  if (parts.length < 2) return null;

  const etapa = parts[parts.length - 1];
  const cliente = parts.slice(0, -1).join('-');

  if (!['tofu', 'mofu', 'bofu'].includes(etapa)) {
    return null;
  }

  return { cliente, etapa };
}

async function getLandingPageData(slug: string): Promise<LandingPageData | null> {
  try {
    const parsed = parseSlug(slug);
    if (!parsed) return null;

    const { cliente, etapa } = parsed;

    const filePath = path.join(process.cwd(), 'lps', slug, 'lp.json');
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      const fileContent = await fs.readFile(filePath, 'utf8');
      return JSON.parse(fileContent) as LandingPageData;
    } else {
      const template = await getFunnelTemplate(etapa as 'tofu' | 'mofu' | 'bofu');
      if (!template) return null;

      const clientData = await getClientData(cliente);
      if (!clientData) return null;

      return processTemplate(template, clientData);
    }
  } catch (error) {
    console.error(`Erro ao carregar LP para ${slug}:`, error);
    return null;
  }
}

async function getClientData(cliente: string) {
  return {
    empresa: cliente.charAt(0).toUpperCase() + cliente.slice(1),
    problema: 'seu problema principal',
    tagline: 'Soluções inteligentes',
  };
}

export async function generateMetadata({ params }: PageProps) {
  const data = await getLandingPageData(params.slug);

  if (!data) {
    return {
      title: 'Página não encontrada',
      description: 'A página que você procura não existe.',
    };
  }

  return {
    title: data.metadata.title,
    description: data.metadata.description,
    icons: {
      icon: data.metadata.favicon || '/favicon.ico',
    },
  };
}

export async function generateStaticParams() {
  try {
    const lpsDir = path.join(process.cwd(), 'lps');
    const entries = await fs.readdir(lpsDir);

    const validSlugs = [] as Array<{ slug: string }>;
    for (const entry of entries) {
      const entryPath = path.join(lpsDir, entry);
      const stats = await fs.stat(entryPath);

      if (stats.isDirectory() && parseSlug(entry)) {
        const lpJsonPath = path.join(entryPath, 'lp.json');
        const hasLpJson = await fs
          .access(lpJsonPath)
          .then(() => true)
          .catch(() => false);

        if (hasLpJson) {
          validSlugs.push({ slug: entry });
        }
      }
    }

    return validSlugs;
  } catch (error) {
    console.error('Erro ao gerar parâmetros estáticos:', error);
    return [];
  }
}

export default async function SlugLandingPage({ params }: PageProps) {
  const data = await getLandingPageData(params.slug);

  if (!data) {
    notFound();
  }

  return <LandingPage data={data} />;
}
