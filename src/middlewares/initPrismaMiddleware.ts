// @ts-ignore
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Context, Next } from 'hono';

export const prismaMiddleware = async (c:Context,next:Next)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    c.set("prisma", prisma);
    console.log("");
    await next();

}