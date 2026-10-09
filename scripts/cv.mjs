/**
 * Prints cv/munawirul-hadi-cv.html to public/munawirul-hadi-cv.pdf, the file
 * behind the site's "Download CV" links.
 *
 *   npm run cv
 *
 * The HTML is the source of truth: edit it, rerun this, and commit both. It is
 * written by hand, not generated from src/data/*, so keep the two in step.
 * Needs a local Chrome; set CHROME to its binary if it is not in the default
 * macOS location. The PDF is committed, so CI never has to print it.
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'cv', 'munawirul-hadi-cv.html');
const out = path.join(root, 'public', 'munawirul-hadi-cv.pdf');
const chrome =
  process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${out}`,
  pathToFileURL(source).href,
], { stdio: 'ignore' });

console.log(`cv: ${path.relative(root, out)}`);
