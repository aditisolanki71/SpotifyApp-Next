import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./songsData";
const prisma = new PrismaClient()
const run = async() => {
   await Promise.all(artistsData.map(artist => {
      //upsert means create or update
      return prisma.artist.upsert({
         where: { name: artist.name},
         update: {},
         create: {
            name: artist.name,
            //error
            songs: {
               create: artist.songs.map(song => ({
                  name: song.name,
                  duration: song.duration,
                  url: song.url
               })),
            }
         }
      })
   }))
}
run()
.catch((e) => {
   console.log(e);
   process.exit(1);
})
.then()
.finally(async () => {
   await prisma.$disconnect();
})