import { LandingPageData } from '@/types/lp-config';
import { generateAISection } from './ai-sections';

function whatsappLink(number: string, message: string) {
  const clean = number.replace(/\D/g, '');
  const msg = encodeURIComponent(message || '');
  return `https://wa.me/${clean}${msg ? `?text=${msg}` : ''}`;
}

function buildHeader(data: any) {
  return {
    id: 'header',
    type: 'header',
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    logo: data.logo ? { type: 'image', src: data.logo, alt: 'Logo' } : { type: 'text', text: 'Logo' },
    navigation: data.navigation || [],
    phone: data.phoneDisplay
      ? { display: data.phoneDisplay, link: `tel:+${data.phoneDisplay.replace(/\D/g, '')}` }
      : undefined,
  };
}

function buildHero(data: any) {
  return {
    id: 'hero',
    type: 'hero',
    backgroundColor: '#f8f9fa',
    textColor: '#1a1a1a',
    title: data.h1 || '',
    description: data.p || '',
    primaryButton: {
      text: data.buttonText || 'Saiba Mais',
      href: whatsappLink(data.whatsNumber || '', data.whatsMessage || ''),
      variant: 'primary',
    },
    image: data.image ? { src: data.image, alt: 'Hero Image' } : { src: '', alt: '' },
  };
}

function buildServices(data: any) {
  return {
    id: 'services',
    type: 'services',
    backgroundColor: '#ffffff',
    textColor: '#1a1a1a',
    title: data.h2 || '',
    items: data.items || [],
    image: data.image ? { src: data.image, alt: 'Services Image' } : { src: '', alt: '' },
  };
}

export function briefToLP(input: string): LandingPageData {
  const lines = input
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l);

  const lp: LandingPageData = {
    metadata: { title: '', description: '', favicon: '/favicon.ico' },
    sections: [],
  };

  let current: string | null = null;
  let data: any = {};

  const pushCurrent = () => {
    if (!current) return;
    if (data.ai) {
      lp.sections.push(generateAISection(current));
    } else {
      switch (current) {
        case 'header':
          lp.sections.push(buildHeader(data));
          break;
        case 'hero':
          lp.sections.push(buildHero(data));
          break;
        case 'services':
          lp.sections.push(buildServices(data));
          break;
        case 'benefits':
          lp.sections.push(data); // if no AI use as is
          break;
        default:
          lp.sections.push({ id: current, type: current, ...data });
      }
    }
    current = null;
    data = {};
  };

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (
      ['header', 'hero', 'benefits', 'services', 'steps', 'technology', 'about', 'testimonials', 'faq', 'contact', 'pricing', 'gallery', 'ctafinal', 'footer'].includes(lower)
    ) {
      pushCurrent();
      current = lower === 'ctafinal' ? 'ctaFinal' : lower;
      continue;
    }

    if (lower === 'ia' && current) {
      data = { ai: true };
      continue;
    }

    if (!current) continue;

    switch (current) {
      case 'header':
        if (line.startsWith('Logo (URL):')) {
          data.logo = line.replace('Logo (URL):', '').trim();
        } else if (/Menu \d+ - nome:/i.test(line)) {
          data.navigation = data.navigation || [];
          data.navigation.push({ label: line.split('nome:')[1].trim(), href: '' });
        } else if (/Menu \d+ - link:/i.test(line)) {
          if (data.navigation && data.navigation.length > 0) {
            data.navigation[data.navigation.length - 1].href = line.split('link:')[1].trim();
          }
        } else if (line.startsWith('Telefone (exibição):')) {
          data.phoneDisplay = line.replace('Telefone (exibição):', '').trim();
        }
        break;
      case 'hero':
        if (line.startsWith('H1:')) data.h1 = line.replace('H1:', '').trim();
        else if (line.startsWith('P:')) data.p = line.replace('P:', '').trim();
        else if (line.startsWith('Botão WhatsApp:')) data.buttonText = line.replace('Botão WhatsApp:', '').trim();
        else if (line.startsWith('Número:')) data.whatsNumber = line.replace('Número:', '').trim();
        else if (line.startsWith('Mensagem:')) data.whatsMessage = line.replace('Mensagem:', '').trim();
        else if (line.startsWith('Imagem:')) data.image = line.replace('Imagem:', '').trim();
        break;
      case 'services':
        if (line.startsWith('H2:')) data.h2 = line.replace('H2:', '').trim();
        else if (/^[\p{Emoji_Presentation}\p{Emoji}]/u.test(line)) {
          const icon = line.charAt(0);
          const text = line.substring(1).trim();
          data.items = data.items || [];
          data.items.push({ icon, text });
        } else if (line.startsWith('Imagem:')) data.image = line.replace('Imagem:', '').trim();
        break;
      default:
        break;
    }
  }

  pushCurrent();
  return lp;
}
