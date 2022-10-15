import jwt from "jsonwebtoken";
import prisma from "./prisma";
import { NextApiRequest, NextApiResponse } from "next";
export const validateRoute = (handler) => {
   return async (req: NextApiRequest, res: NextApiResponse) => {
      // const { SPOTIFY_ACCESS_TOKEN } = req.cookies;
      const token = req.cookies.SPOTIFY_ACCESS_TOKEN;
      if(token) {
         let user;
         try {
            const { id } = jwt.verify(token, "hello");
            user = await prisma.user.findUnique({
               where: { id },
            })
            if(!user) {
               throw new Error("Invalid user!!!")
            }
         }catch(e) {
            res.status(401)
            res.json({ error: "Not AUthorized user" })
            return
         }
         return handler(req, res, user)
      }
      res.status(401)
      res.json({ error: "Not Authorized" })
   }
}

export const validateToken = token => {
   const user = jwt?.verify(token, "hello")
   return user;
}