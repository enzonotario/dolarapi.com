import { verify } from 'hono/jwt';

export const qstash = () => {
    return async (c, siguiente) => {
        const firma = c.req.header('Upstash-Signature');
        const secreto = import.meta.env.VITE_QSTASH_CURRENT_SIGNING_KEY;
        
        try {
            const verificar = await verify(firma, secreto);
            
            return siguiente();
        } catch(error) {
            return new Response('No autorizado', {
                status: 401,
            });
        }
    };
};

