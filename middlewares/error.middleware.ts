import type { ApiMiddleware } from 'motia';
import { AppError } from '../errors/AppError';
import { ZodError } from 'zod';

export const errorMiddleware: ApiMiddleware = async (req, ctx, next) => {
    try {
        return await next();
    } catch (error: any) {
        ctx.logger.error('Unhandled exception', { error });

        if (error instanceof AppError) {
            return {
                status: error.statusCode,
                body: {
                    status: 'error',
                    message: `App Error: ${error.message}`,
                },
            };
        }

        if (error instanceof ZodError) {
            return {
                status: 400,
                body: {
                    status: 'fail',
                    message: `Validation Error: ${error.message}`,
                    errors: error.issues,
                },
            };
        }

        // Database errors (Knex/Postgres) often have a code
        if (error.code) {
            // Unique constraint violation
            if (error.code === '23505') {
                return {
                    status: 409,
                    body: {
                        status: 'fail',
                        message: `Duplicate entry: ${error.message}`,
                    },
                };
            }
        }

        return {
            status: 500,
            body: {
                status: 'error',
                message: `Internal Server Error: ${error.message}`,
            },
        };
    }
};


export const ZodErrorMiddleware: ApiMiddleware = async (req, ctx, next) => {
    try {
        return await next()
    } catch (error: any) {
        if (error instanceof ZodError) {
            ctx.logger.error('Validation error', { errors: error.issues })
            return { status: 400, body: { status: 'fail', message: 'Validation failed', issues: error.issues } }
        }

        ctx.logger.error('Unexpected error', { error: error.message })
        return { status: 500, body: { status: 'error', message: 'Internal server error' } }
    }
}