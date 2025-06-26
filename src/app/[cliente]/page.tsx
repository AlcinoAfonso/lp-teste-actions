import { notFound } from 'next/navigation';
import LandingPage from '@/components/LandingPage';
import { LandingPageData } from '@/types/lp-config';
import fs from 'fs/promises';
import path from 'path';

interface PageProps {
  params: {
    cliente: string;
  };
}

// Função para buscar dados da LP
async function getLandingPageData(cliente: string): Promise<LandingPageData | null> {
  try {
    // Caminho para o arquivo JSON do cliente
    const filePath = path.join(process.cwd(), 'lps', cliente, 'lp.json');
    
    // Verifica se o arquivo existe
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    
    if (!fileExists) {
      return null;
    }
    
    // Lê e parse o arquivo JSON
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent) as LandingPageData;
    
    return data;
  } catch (error) {
    console.error(`Erro ao carregar LP para cliente ${cliente}:`, error);
    return null;
  }
}

// Gera metadata dinâmica
export async function generateMetadata({ params }: PageProps) {
  const data = await getLandingPageData(params.cliente);
  
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

// Gera rotas estáticas para build
export async function generateStaticParams() {
  try {
    // Lê todas as pastas em /lps
    const lpsDir = path.join(process.cwd(), 'lps');
    const clients = await fs.readdir(lpsDir);
    
    // Filtra apenas diretórios que contém lp.json
    const validClients = [];
    for (const client of clients) {
      const clientPath = path.join(lpsDir, client);
      const stats = await fs.stat(clientPath);
      
      if (stats.isDirectory()) {
        const lpJsonPath = path.join(clientPath, 'lp.json');
        const hasLpJson = await fs.access(lpJsonPath).then(() => true).catch(() => false);
        
        if (hasLpJson) {
          validClients.push({ cliente: client });
        }
      }
    }
    
    return validClients;
  } catch (error) {
    console.error('Erro ao gerar parâmetros estáticos:', error);
    return [];
  }
}

export default async function ClienteLandingPage({ params }: PageProps) {
  const data = await getLandingPageData(params.cliente);
  
  if (!data) {
    notFound();
  }
  
  return <LandingPage data={data} />;
}
