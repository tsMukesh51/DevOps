import { Hono } from 'hono'
// import { PrismaClient } from '@prisma/client/edge';
import { PrismaClient } from './generated/prisma/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/user', async (c) => {
  const prismaClient = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const randomNum = Math.round(10 * Math.random());
  const user = await prismaClient.user.findFirst({
    where: {
      id: randomNum
    }
  });
  return c.json({
    message: 'User fetched',
    data: user,
  });
});

app.post('/user', async (c) => {
  const body = await c.req.json();
  const prismaClient = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const user = await prismaClient.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password
    }
  });
  return c.json({
    message: 'User Created',
    data: user
  });
});

export default app;
