import type { FlowContext } from 'motia';

export class CacheService {
    private static readonly GROUP_PREFIX = 'api-cache';

    /**
     * Generates a full group ID with prefix
     */
    private static getGroupId(resource: string): string {
        return `${this.GROUP_PREFIX}:${resource}`;
    }

    /**
     * Retrieves a value from the cache
     */
    static async get<T>(ctx: FlowContext, resource: string, key: string): Promise<T | null> {
        const groupId = this.getGroupId(resource);
        try {
            const cached = await ctx.state.get<T>(groupId, key);
            if (cached) {
                ctx.logger.debug('Cache HIT', { resource, key });
                return cached;
            }
        } catch (error) {
            ctx.logger.warn('Cache GET failed', { error, resource, key });
        }
        ctx.logger.debug('Cache MISS', { resource, key });
        return null;
    }

    /**
     * Sets a value in the cache
     */
    static async set<T>(ctx: FlowContext, resource: string, key: string, value: T): Promise<void> {
        const groupId = this.getGroupId(resource);
        try {
            await ctx.state.set(groupId, key, value);
            ctx.logger.debug('Cache SET', { resource, key });
        } catch (error) {
            ctx.logger.warn('Cache SET failed', { error, resource, key });
        }
    }

    /**
     * Invalidates an entire resource group
     */
    static async invalidate(ctx: FlowContext, resource: string): Promise<void> {
        const groupId = this.getGroupId(resource);
        try {
            await ctx.state.clear(groupId);
            ctx.logger.debug('Cache INVALIDATED', { resource });
        } catch (error) {
            ctx.logger.warn('Cache INVALIDATION failed', { error, resource });
        }
    }
}
