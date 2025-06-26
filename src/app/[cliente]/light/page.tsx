import { notFound } from 'next/navigation';
import { LandingPageLight } from '@/components/light/LandingPageLight';
import { LandingPageData } from '@/types/lp-config';
import fs from 'fs/promises';
import path from 'path';

// CSS dos componentes light
import '@/components/light/light-components.css';
import '@/components/light/additional-styles.css';
import '@/styles/themes.css';

interface PageProps {
  params: {
    cliente: string;
  };
}

async function getLandingPageData(cliente: string): Promise<LandingPageData | null> {
  try {
    const filePath = path.join(process.cwd(), 'lps', cliente, 'lp.json');
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

    if (!fileExists) {
      return null;
    }

    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent) as LandingPageData;

    return data;
  } catch (error) {
    console.error(`Erro ao carregar LP light para cliente ${cliente}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const data = await getLandingPageData(params.cliente);

  if (!data) {
    return {
      title: 'Página não encontrada',
      description: 'A página que você procura não existe.',
    };
  }

  return {
    title: data.metadata.title + ' | Light Version',
    description: data.metadata.description,
    icons: {
      icon: data.metadata.favicon || '/favicon.ico',
    },
  };
}

export default async function ClienteLandingPageLight({ params }: PageProps) {
  const data = await getLandingPageData(params.cliente);

  if (!data) {
    notFound();
  }

  return <LandingPageLight data={data} />;
}
