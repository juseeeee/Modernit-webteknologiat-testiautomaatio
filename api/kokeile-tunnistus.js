import { readFile } from 'node:fs/promises';
import { luoTunnistus } from './src/tunnistus.js';

const { avaimet } = JSON.parse(await readFile('data/avaimet.json', 'utf8'));
const { vaadiAvain } = luoTunnistus(avaimet);

/* Valepyynto ja -vastaus: riittaa, etta niilla on ne osat, joita vaadiAvain kayttaa. */
function kokeile(avain) {
  const req = { get: () => avain };
  const res = { status(koodi) { console.log('  status', koodi); return this; }, json(runko) { console.log('  json', runko); } };
  vaadiAvain(req, res, () => console.log('  next(), kayttaja:', req.kayttaja.nimi));
}

console.log('Ei avainta:'); kokeile(undefined);
console.log('Vaara avain:'); kokeile('arvaus');
console.log('Kettu:'); kokeile('opiskelija-91c2');