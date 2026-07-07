import {fileURLToPath} from 'node:url';
import {readFile, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {renderAsync} from '@resvg/resvg-js';
import {satoriVue} from 'x-satori/vue';

(async function() {
    const _DIRNAME = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url));

    const _OUTPUT = resolve(_DIRNAME, '../docs/public/assets/og.png');

    const templateStr = await readFile(resolve(_DIRNAME, './Template.vue'), 'utf8');

    const satoriConfig = (await import('./config.js')).default;
    const strSVG = await satoriVue(satoriConfig, templateStr);

    const render = await renderAsync(strSVG, {
        fitTo: {
            mode: 'width',
            value: 1200,
        },
    });

    return await writeFile(_OUTPUT, render.asPng());
})().catch(async (err) => {
    console.error(err);
    await import('node:process').then(({exit}) => exit(1));
});

