const BASE_URL = 'https://biblia-fontes.vercel.app';

const libri = [
  ['genesi', 'GENESI'],
  ['esodo', 'ESODO'],
  ['levitico', 'LEVITICO'],
  ['numeri', 'NUMERI'],
  ['deuteronomio', 'DEUTERONOMIO'],

  ['giosue', 'GIOSUÈ'],
  ['giudici', 'GIUDICI'],
  ['rut', 'RUT'],
  ['1-samuele', '1 SAMUELE'],
  ['2-samuele', '2 SAMUELE'],
  ['1-re', '1 RE'],
  ['2-re', '2 RE'],
  ['1-cronache', '1 CRONACHE'],
  ['2-cronache', '2 CRONACHE'],
  ['esdra', 'ESDRA'],
  ['neemia', 'NEEMIA'],
  ['tobia', 'TOBIA'],
  ['giuditta', 'GIUDITTA'],
  ['ester', 'ESTER'],
  ['1-maccabei', '1 MACCABEI'],
  ['2-maccabei', '2 MACCABEI'],

  ['giobbe', 'GIOBBE'],
  ['salmi', 'SALMI'],
  ['proverbi', 'PROVERBI'],
  ['qoelet', 'QOÈLET'],
  ['cantico-dei-cantici', 'CANTICO DEI CANTICI'],
  ['sapienza', 'SAPIENZA'],
  ['siracide', 'SIRACIDE'],

  ['isaia', 'ISAIA'],
  ['geremia', 'GEREMIA'],
  ['lamentazioni', 'LAMENTAZIONI'],
  ['baruc', 'BARUC'],
  ['ezechiele', 'EZECHIELE'],
  ['daniele', 'DANIELE'],
  ['osea', 'OSEA'],
  ['gioele', 'GIOELE'],
  ['amos', 'AMOS'],
  ['abdia', 'ABDIA'],
  ['giona', 'GIONA'],
  ['michea', 'MICHEA'],
  ['naum', 'NAUM'],
  ['abacuc', 'ABACUC'],
  ['sofonia', 'SOFONIA'],
  ['aggeo', 'AGGEO'],
  ['zaccaria', 'ZACCARIA'],
  ['malachia', 'MALACHIA'],

  ['matteo', 'MATTEO'],
  ['marco', 'MARCO'],
  ['luca', 'LUCA'],
  ['giovanni', 'GIOVANNI'],
  ['atti', 'ATTI DEGLI APOSTOLI'],

  ['romani', 'ROMANI'],
  ['1-corinti', '1 CORINZI'],
  ['2-corinti', '2 CORINZI'],
  ['galati', 'GALATI'],
  ['efesini', 'EFESINI'],
  ['filippesi', 'FILIPPESI'],
  ['colossesi', 'COLOSSESI'],
  ['1-tessalonicesi', '1 TESSALONICESI'],
  ['2-tessalonicesi', '2 TESSALONICESI'],
  ['1-timoteo', '1 TIMOTEO'],
  ['2-timoteo', '2 TIMOTEO'],
  ['tito', 'TITO'],
  ['filemone', 'FILEMONE'],

  ['ebrei', 'EBREI'],

  ['giacomo', 'GIACOMO'],
  ['1-pietro', '1 PIETRO'],
  ['2-pietro', '2 PIETRO'],
  ['1-giovanni', '1 GIOVANNI'],
  ['2-giovanni', '2 GIOVANNI'],
  ['3-giovanni', '3 GIOVANNI'],
  ['giuda', 'GIUDA'],

  ['apocalisse', 'APOCALISSE'],
];

if (libri.length !== 73) {
  console.error(`ERRORE INTERNO: attesi 73 libri, trovati ${libri.length}`);
  process.exit(1);
}

const risultati = [];

async function controllaLibro(slug, titolo) {
  const url = `${BASE_URL}/bibbia/${slug}/1`;

  const risultato = {
    titolo,
    slug,
    url,
    status: null,
    redirected: false,
    finalUrl: null,
    okHttp: false,
    contieneTitolo: false,
    sembraReader: false,
    errore: null,
  };

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'user-agent': 'Biblia-Fontes-Production-Audit/1.0',
        'cache-control': 'no-cache',
      },
    });

    const html = await response.text();

    risultato.status = response.status;
    risultato.redirected = response.redirected;
    risultato.finalUrl = response.url;

    risultato.okHttp =
      response.status >= 200 &&
      response.status < 400;

    const testo = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .toLocaleUpperCase('it-IT');

    risultato.contieneTitolo =
      testo.includes(titolo.toLocaleUpperCase('it-IT'));

    /*
     * Non cerchiamo una singola frase rigida perché il Reader
     * può cambiare leggermente nel tempo.
     *
     * Bastano alcuni indicatori semantici compatibili con
     * la pagina di lettura/studio.
     */
    const indicatoriReader = [
      'CAPITOLO',
      'TESTO',
      'VERS',
      'LETTURA',
      'STUDIO',
      'SINTESI',
      'APPARATO',
    ];

    const indicatoriPresenti =
      indicatoriReader.filter((x) => testo.includes(x));

    risultato.sembraReader =
      risultato.okHttp &&
      risultato.contieneTitolo &&
      indicatoriPresenti.length >= 2;

  } catch (error) {
    risultato.errore =
      error instanceof Error
        ? error.message
        : String(error);
  }

  return risultato;
}

console.log(`Audit Reader di produzione`);
console.log(`Base URL: ${BASE_URL}`);
console.log(`Libri attesi: ${libri.length}`);
console.log('');

for (const [slug, titolo] of libri) {
  const r = await controllaLibro(slug, titolo);
  risultati.push(r);

  const simbolo = r.sembraReader ? '✓' : '✗';

  console.log(
    `${simbolo} ${titolo.padEnd(24)} ` +
    `HTTP ${String(r.status ?? 'ERR').padEnd(3)} ` +
    `/bibbia/${slug}/1`
  );
}

const anomalie = risultati.filter((r) => !r.sembraReader);

const riepilogo = {
  dataAudit: new Date().toISOString(),
  baseUrl: BASE_URL,
  libriAttesi: libri.length,
  libriControllati: risultati.length,
  readerOK: risultati.length - anomalie.length,
  readerConAnomalie: anomalie.length,
  coperturaReaderPercento:
    Number(
      (
        ((risultati.length - anomalie.length) /
          risultati.length) *
        100
      ).toFixed(2)
    ),
};

console.log('');
console.log('RIEPILOGO');
console.log(JSON.stringify(riepilogo, null, 2));

if (anomalie.length) {
  console.log('');
  console.log('ANOMALIE');
  console.log(
    JSON.stringify(
      anomalie.map((r) => ({
        titolo: r.titolo,
        slug: r.slug,
        url: r.url,
        status: r.status,
        finalUrl: r.finalUrl,
        contieneTitolo: r.contieneTitolo,
        sembraReader: r.sembraReader,
        errore: r.errore,
      })),
      null,
      2
    )
  );
}

await Bun?.write?.(
  'audit-reader-production.json',
  JSON.stringify(
    {
      riepilogo,
      anomalie,
      risultati,
    },
    null,
    2
  )
).catch?.(() => {});

/*
 * Compatibilità Node.js: Bun.write sopra viene semplicemente
 * ignorato quando Bun non esiste.
 */
if (typeof process !== 'undefined') {
  const fs = await import('node:fs/promises');

  await fs.writeFile(
    'audit-reader-production.json',
    JSON.stringify(
      {
        riepilogo,
        anomalie,
        risultati,
      },
      null,
      2
    ),
    'utf8'
  );
}

process.exitCode = anomalie.length ? 1 : 0;
