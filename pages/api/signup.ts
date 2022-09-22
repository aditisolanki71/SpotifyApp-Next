import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
//    if email and ppwd already exist than send err
//    else if success than generate json webtoken and save it as a cookie & set in yr browser
//    cookie will be set on every other req that can verify
//    json web token -->imagine object,generate some string
   const salt = bcrypt.genSaltSync();
   const { email, password } = req.body;
   let user;
   try {
      user = await prisma.user.create({
         data: {
            email,
            password: bcrypt.hashSync(password, salt),
            firstName: "aditi",
            lastName: "solanki"
         },
      })
   } catch(e) {
      res.status(401)
      res.json({ error: "User already exists" })
      return
   }

   //create JSON web token
   const token = jwt.sign(
      {
         email: user.email,
         id: user.id,
         time: Date.now(),
      },
      'hello', 
      { expiresIn: '8h' }
   )

   //set token
   res.setHeader(
      'Set-Cookie',
      cookie.serialize('SPOTIFY_ACCESS_TOKEN', token, {
         httpOnly: true,
         maxAge: 8 * 60 * 60,
         path: '/',
         sameSite: 'lax',
         secure: process.env.NODE_ENV === 'production',
      })
   )
   res.json(user);
}