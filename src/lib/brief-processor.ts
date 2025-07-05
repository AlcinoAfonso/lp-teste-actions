// Edited by Codex
import { LandingPageV2 } from '@/types/lp-config-v2';

const sections = [
  'header',
  'hero',
  'benefits',
  'services',
  'testimonials',
  'steps',
  'about',
  'faq',
  'ctaFinal',
  'footer',
];

export function parseBrief(content: string): LandingPageV2 {
  const lines = content
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l);

  const lp: LandingPageV2 = {
    metadata: { title: '', description: '' },
    sections: [],
    creation_info: { data_criacao: new Date().toISOString() },
  };

  let current: string | null = null;
  let data: Record<string, any> = {};

  const pushSection = () => {
    if (!current) return;
    lp.sections.push({ id: current!, type: current!, ...data });
    current = null;
    data = {};
  };

  for (const line of lines) {
    if (sections.includes(line)) {
      pushSection();
      current = line === 'ctafinal' ? 'ctaFinal' : line;
      continue;
    }

    if (line === 'IA' && current) {
      data.ai = true;
      continue;
    }

    if (!current) {
      const [key, ...rest] = line.split(':');
      const value = rest.join(':').trim();
      switch (key.toLowerCase()) {
        case 'empresa':
          lp.metadata.title = value;
          break;
        case 'objetivo da lp':
          lp.metadata.description = value;
          break;
        default:
          break;
      }
      continue;
    }

    const [key, ...rest] = line.split(':');
    if (rest.length > 0) {
      data[key.trim()] = rest.join(':').trim();
    } else if (/^[\p{Emoji_Presentation}\p{Emoji}]/u.test(line)) {
      const icon = line.charAt(0);
      const text = line.substring(1).trim();
      data.items = data.items || [];
      data.items.push({ icon, text });
    }
  }

  pushSection();
  return lp;
}
