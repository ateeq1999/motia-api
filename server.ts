import fastifyJwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';

// Extend FastifyRequest with user property
declare module 'fastify' {
    interface FastifyRequest {
        user: {
            id: string;
            email: string;
        };
    }
}

export function setupAuth(app: FastifyInstance) {
    app.register(fastifyJwt, {
        secret: process.env.JWT_SECRET || 'a-very-secret-key-that-should-be-in-env',
    });

    app.decorate('authenticate', async function (request: any, reply: any) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });
}
