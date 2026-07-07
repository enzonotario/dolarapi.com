export function openapiAtributos(openapi, operationId) {
    const operation = openapi.getOperation(operationId);

    return {
        operation: operation,
    };
}

