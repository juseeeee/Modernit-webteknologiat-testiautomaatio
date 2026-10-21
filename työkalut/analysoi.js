import { readFile } from 'node:fs/promises';
import { jasennaRivi, ohitettava } from './jasenna.js';

const teksti = await readFile('varausloki.log', 'utf8');
const virheelliset = [];

teksti.split(/\r?\n/).forEach((rivi, i) => {
  if (ohitettava(rivi)) {
    return;
  }
  if (!jasennaRivi(rivi)) {
    virheelliset.push(i + 1);
  }
});

console.log('Virheelliset rivit:', virheelliset);