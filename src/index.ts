import { Hono } from 'hono';
import { prismaMiddleware } from './middlewares/initPrismaMiddleware';
import { generateJWT } from './middlewares/Jwt/generqateJwt';
import { jwtMiddleWare } from './middlewares/Jwt/jwtMiddleWare';
import { setCookie } from 'hono/cookie';
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET : string
  };
  Variables: {
    prisma: any;
  };
}>();

// Middleware
app.use('*', prismaMiddleware);
app.use('/auth/*',jwtMiddleWare);


// Routes
app.get('/', async (c) => {
  const token = await generateJWT({ user: 'vinay' }, c.env.JWT_SECRET);
  setCookie(c, 'token', token, { httpOnly: true, secure: true, path: '/' });
  return c.text('Hello Hono! Token set.');
});

app.get('/auth/check', (c) => {
  const jwtPayload = c.get('jwtPayload');
  return c.json({ message: 'Protected route', jwtPayload });
});

app.get('/auth/signup', async (c) => {
  const prisma = c.get('prisma');
  const res = await prisma.user.create({
    data: {
      email: 'v12@gmail.com',
      name: 'vinay',
    },
    select: {
      id: true,
    },
  });
  return c.json({ message: res });
});

export default app;
