import { briefToLP } from '../src/lib/brief-to-lp';
import fs from 'fs/promises';

async function main() {
  const slug = process.env.SLUG || 'lp';
  const brief = process.env.BRIEF_CONTENT || '';
  if (!brief) {
    throw new Error('No brief provided');
  }
  const lp = briefToLP(brief);
  const dir = `lps/${slug}`;
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(`${dir}/lp.json`, JSON.stringify(lp, null, 2));
  console.log(`LP saved to ${dir}/lp.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
