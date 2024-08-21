import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import {sign} from 'hono/jwt';
import {signupInput , signinInput} from '@kushallunkad/medium-common'
// Create the main Hono app
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET : string
	}
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message : "Inputs not correct"
        })
    }
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	
	try {
		const user = await prisma.user.create({
			data: {
				email: body.username,
				password: body.password,
        name : body.name
			}
		});
	 
  const token = await sign({userId : user.id},c.env.JWT_SECRET)

  return c.text(token)
	}catch(e) {
  console.log(e)
	 c.status(411);
   return c.text('Invalid')
	}
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body)
    if(!success){
        c.status(411);
        return c.json({
            message : "Inputs not correct"
        })
    }
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const user = await prisma.user.findFirst({
			where : {
				email: body.username,
				password: body.password,
			}
		});
        // console.log(body.username)
        // console.log(body.password)
        // console.log(user)
    if(!user){
      c.status(403); // unauthorized
      return c.json({
        message : "Incorrect Creds"
      })
    }
	else{
  const token = await sign({userId : user.id},c.env.JWT_SECRET)

  return c.text(token)
    }
	}catch(e) {
  console.log(e)
	 c.status(411);
   return c.text('Invalid')
	}
})