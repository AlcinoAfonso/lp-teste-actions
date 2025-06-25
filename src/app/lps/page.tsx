import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { LandingPageData } from '@/types/lp-config';

interface LPInfo {
  cliente: string;
  title: string;
  description: string;
  url: string;
}

async function getAllLandingPages(): Promise<LPInfo[]> {
  try {
    const lpsDir = path.join(process.cwd(), 'lps');
    const clients = await fs.readdir(lpsDir);
    
    const landingPages: LPInfo[] = [];
    
    for (const client of clients) {
      const clientPath = path.join(lpsDir, client);
      const stats = await fs.stat(clientPath);
      
      if (stats.isDirectory()) {
        const lpJsonPath = path.join(clientPath, 'lp.json');
        
        try {
          const fileContent = await fs.readFile(lpJsonPath, 'utf8');
          const data = JSON.parse(fileContent) as LandingPageData;
          
          landingPages.push({
            cliente: client,
            title: data.metadata.title,
            description: data.metadata.description,
            url: `/${client}`,
          });
        } catch (error) {
          console.error(`Erro ao ler LP de ${client}:`, error);
        }
      }
    }
    
    return landingPages.sort((a, b) => a.cliente.localeCompare(b.cliente));
  } catch (error) {
    console.error('Erro ao listar LPs:', error);
    return [];
  }
}

export const metadata = {
  title: 'Todas as Landing Pages - LP Factory',
  description: 'Lista de todas as landing pages criadas pela LP Factory',
};

export default async function LandingPagesListPage() {
  const landingPages = await getAllLandingPages();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-lp">
        <h1 className="text-4xl font-bold text-center mb-12">
          Landing Pages Criadas
        </h1>
        
        {landingPages.length === 0 ? (
          <p className="text-center text-gray-600">
            Nenhuma landing page encontrada.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingPages.map((lp) => (
              <Link
                key={lp.cliente}
                href={lp.url}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 block"
              >
                <h2 className="text-xl font-semibold mb-2">{lp.cliente}</h2>
                <h3 className="text-sm text-gray-600 mb-2">{lp.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {lp.description}
                </p>
                <span className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-800">
                  Ver Landing Page →
                </span>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 underline"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
