import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { LandingPageData } from '@/types/lp-config';

interface LPInfo {
  slug: string;
  cliente: string;
  lpNome: string;
  title: string;
  description: string;
  url: string;
  dataCriacao?: string;
  secoesCount: number;
}

async function getAllLandingPagesV2(): Promise<LPInfo[]> {
  try {
    const lpsDir = path.join(process.cwd(), 'lps');
    const clients = await fs.readdir(lpsDir);

    const landingPages: LPInfo[] = [];

    for (const clientDir of clients) {
      const clientPath = path.join(lpsDir, clientDir);
      const stats = await fs.stat(clientPath);

      if (stats.isDirectory()) {
        const lpJsonPath = path.join(clientPath, 'lp.json');

        try {
          const fileContent = await fs.readFile(lpJsonPath, 'utf8');
          const data = JSON.parse(fileContent) as any;

          // Extrai informações
          const slug = clientDir;
          const [cliente, ...lpNomeParts] = slug.split('-');
          const lpNome = lpNomeParts.join('-') || 'principal';

          landingPages.push({
            slug,
            cliente,
            lpNome,
            title: data.metadata?.title || `${cliente} - ${lpNome}`,
            description: data.metadata?.description || 'Landing Page',
            url: `/${slug}`,
            dataCriacao: data.creation_info?.data_criacao,
            secoesCount: data.sections?.length || 0
          });
        } catch (error) {
          console.error(`Erro ao ler LP de ${clientDir}:`, error);
        }
      }
    }

    return landingPages.sort((a, b) => {
      // Ordena por data de criação (mais recente primeiro)
      if (a.dataCriacao && b.dataCriacao) {
        return new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime();
      }
      return a.slug.localeCompare(b.slug);
    });
  } catch (error) {
    console.error('Erro ao listar LPs:', error);
    return [];
  }
}

export const metadata = {
  title: 'Todas as Landing Pages - LP Factory V3',
  description: 'Lista de todas as landing pages criadas pela LP Factory',
};

export default async function LandingPagesListPageV2() {
  const landingPages = await getAllLandingPagesV2();

  // Agrupa por cliente
  const groupedByCliente = landingPages.reduce((acc, lp) => {
    if (!acc[lp.cliente]) {
      acc[lp.cliente] = [];
    }
    acc[lp.cliente].push(lp);
    return acc;
  }, {} as Record<string, LPInfo[]>);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-lp">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Landing Pages Factory V3
          </h1>
          <p className="text-gray-600">
            {landingPages.length} landing pages ativas • Sistema de briefs estruturados
          </p>
        </div>

        {landingPages.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-8">
              Nenhuma landing page encontrada.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
              <h3 className="font-semibold mb-2">Como criar uma LP:</h3>
              <ol className="text-left text-sm text-gray-600 space-y-1">
                <li>1. Abra uma Issue no GitHub</li>
                <li>2. Título: <code>[LP] cliente - nome-da-lp</code></li>
                <li>3. Corpo: Brief estruturado</li>
                <li>4. Aguarde o processamento automático</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByCliente).map(([cliente, lps]) => (
              <div key={cliente} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">{cliente}</h2>
                <ul className="space-y-2">
                  {lps.map((lp) => (
                    <li key={lp.slug}>
                      <Link href={lp.url} className="text-blue-600 hover:text-blue-800">
                        {lp.lpNome}
                      </Link>
                      <span className="ml-2 text-gray-500">({lp.secoesCount} seções)</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-800 underline">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
