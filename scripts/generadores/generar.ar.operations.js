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
    return Object
        .keys(spec.paths)
        .filter((path) => !path.includes('/ambito/'))
        .map((path) => {
            const {operationId} = spec.paths[path].get;

            const markdown = generateMarkdown(operationId);

            fs.writeFileSync(`docs/argentina/operations/${operationId}.md`, markdown);
        });
}

function generateMarkdown(operationId) {
    const operation = openapi.getOperation(operationId);

    const markdown = `---
aside: false
outline: false
title: ${operation.summary}
---

<script setup>
import { setRegionForSidebar } from '../../.vitepress/sidebar/sidebar.utils.js'

const spec = setRegionForSidebar('ar')
</script>

${plantilla(operationId, operation)}
`;

    return markdown;
}

try {
    init();
} catch(error) {
    console.error(error);
}

