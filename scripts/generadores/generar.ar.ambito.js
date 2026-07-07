import fs from 'node:fs';
import {useOpenapi} from 'vitepress-openapi/client';
import {plantilla} from './plantilla.js';
import {openapiAtributos} from './openapiAtributos.js';

function loadJSON(path) {
    return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
}

const spec = loadJSON('../../docs/public/openapi.json');

const openapi = useOpenapi({
    spec,
});

export function init() {
    let output = `---
aside: false
outline: false
title: Dólares Ámbito
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

<div class="flex flex-col">
`;

    Object
        .keys(spec.paths)
        .filter((path) => path.startsWith('/v1/ambito'))
        .map((path, index, array) => {
            const {operationId} = spec.paths[path].get;
            const markdown = generateMarkdown(operationId);

            output += `${markdown}
<hr style="margin: 4rem 0;">
`;
        });

    output += `
<OAFooter />

</div>`;

    fs.writeFileSync(`docs/argentina/ambito/index.md`, output);
}

function generateMarkdown(operationId) {
    const operation = openapi.getOperation(operationId);

    const markdown = `
${plantilla(operationId, operation, true)}
`;

    return markdown;
}

try {
    init();
} catch(error) {
    console.error(error);
}

