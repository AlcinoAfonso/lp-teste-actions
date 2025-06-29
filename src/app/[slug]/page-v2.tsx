import { notFound } from 'next/navigation';
import LandingPage from '@/components/LandingPage';
import { LandingPageData } from '@/types/lp-config';
import fs from 'fs/promises';
import path from 'path';

interface PageProps {
  params: {
    slug: string;
  };
}

// Função para buscar dados da LP (nova estrutura)
async function getLandingPageData(slug: string): Promise<LandingPageData | null> {
  try {
    // Tenta carregar LP na nova estrutura: /lps/cliente-nome-lp/
    const filePath = path.join(process.cwd(), 'lps', slug, 'lp.json');
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const lpData = JSON.parse(fileContent);

      // Converte nova estrutura para formato compatível se necessário
      return convertToLegacyFormat(lpData);
    }

    console.error(`LP não encontrada: ${slug}`);
    return null;
  } catch (error) {
    console.error(`Erro ao carregar LP para ${slug}:`, error);
    return null;
  }
}

// Converte nova estrutura para formato compatível com componentes existentes
function convertToLegacyFormat(newFormat: any): LandingPageData {
  return {
    metadata: newFormat.metadata,
    sections: newFormat.sections.map((section: any) => {
      // Mapeia campos específicos baseado no tipo da seção
      switch (section.type) {
        case 'header':
          return {
            ...section,
            logo: section.logo_url ?
              { type: 'image', src: section.logo_url, alt: 'Logo' } :
              { type: 'text', text: 'Logo', subtitle: '' },
            navigation: section.navegacao || [],
            phone: section.telefone ? {
              display: section.telefone.exibicao,
              link: section.telefone.link
            } : undefined
          };

        case 'hero':
          return {
            ...section,
            title: section.h1 || section.title,
            description: section.paragrafo || section.description,
            primaryButton: section.botao_whatsapp ? {
              text: section.botao_whatsapp.rotulo,
              href: `https://wa.me/${section.botao_whatsapp.numero}?text=${encodeURIComponent(section.botao_whatsapp.mensagem)}`,
              variant: 'primary'
            } : section.primaryButton,
            image: section.imagem_url ?
              { src: section.imagem_url, alt: 'Hero Image' } :
              section.image
          };

        case 'services':
          return {
            ...section,
            title: section.h2 || section.title,
            image: section.imagem_url ?
              { src: section.imagem_url, alt: 'Services Image' } :
              section.image,
            button: section.botao_whatsapp ? {
              text: section.botao_whatsapp.rotulo,
              href: `https://wa.me/${section.botao_whatsapp.numero}?text=${encodeURIComponent(section.botao_whatsapp.mensagem)}`,
              variant: 'primary'
            } : section.button
          };

        case 'testimonials':
          return {
            ...section,
            title: section.h2 || section.title,
            videos: section.youtube_links ?
              section.youtube_links.map((link: string, index: number) => {
                const videoId = link.match(/v=([^&]+)/)?.[1];
                return {
                  embedUrl: `https://www.youtube.com/embed/${videoId}`,
                  title: `Depoimento ${index + 1}`
                };
              }) :
              section.videos
          };

        case 'steps':
          return {
            ...section,
            title: section.h2 || section.title,
            button: section.botao_whatsapp ? {
              text: section.botao_whatsapp.rotulo,
              href: `https://wa.me/${section.botao_whatsapp.numero}?text=${encodeURIComponent(section.botao_whatsapp.mensagem)}`,
              variant: 'primary'
            } : section.button
          };

        case 'about':
          return {
            ...section,
            title: section.h2 || section.title,
            description: section.texto || section.description,
            image: section.imagem_url ?
              { src: section.imagem_url, alt: 'About Image' } :
              section.image
          };

        case 'ctaFinal':
          return {
            ...section,
            title: section.h2 || section.title,
            subtitle: section.h3 || section.subtitle,
            button: section.botao_whatsapp ? {
              text: section.botao_whatsapp.rotulo,
              href: `https://wa.me/${section.botao_whatsapp.numero}?text=${encodeURIComponent(section.botao_whatsapp.mensagem)}`,
              variant: 'primary'
            } : section.button
          };

        case 'footer':
          return {
            ...section,
            instagram: {
              url: section.instagram_url,
              text: '@empresa'
            },
            legalLink: section.termo_uso ? {
              text: section.termo_uso.texto,
              href: section.termo_uso.url
            } : section.legalLink
          };

        default:
          return section;
      }
    })
  };
}

// Gera metadata dinâmica
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

// Gera rotas estáticas para build
export async function generateStaticParams() {
  try {
    const lpsDir = path.join(process.cwd(), 'lps');
    const entries = await fs.readdir(lpsDir);

    const validSlugs = [] as Array<{ slug: string }>;
    for (const entry of entries) {
      const entryPath = path.join(lpsDir, entry);
      const stats = await fs.stat(entryPath);

      if (stats.isDirectory()) {
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
