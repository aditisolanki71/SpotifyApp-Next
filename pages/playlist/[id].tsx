import GradientLayout from "../../components/GradientLayout";
import SongTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const getBackgroundColor = id => {
   const colors = [
      'red','green','blue','orange','purple','gray','yellow'
   ]
   return colors[id - 1] || colors[Math.random() * colors.length]
}
const Playlist = ({playlist}) =>{
   const color = getBackgroundColor(playlist.id)
   return (
      <GradientLayout 
         color={color} 
         roundImage={false} 
         title={playlist?.name} 
         subtitle="playlist" 
         description={`${playlist?.songs.length} songs`}
         //image={`/images/playlist/img5.jpg`}
         image={`https://picsum.photos/400?random=${playlist.id}`}
      >
            <SongTable songs={playlist?.songs}/>
      </GradientLayout>
   )
}

export const getServerSideProps = async ({query, req}) => {
   let user 
   try {
      user = validateToken(req.cookies.SPOTIFY_ACCESS_TOKEN);
   }
   catch(e) {
      return {
         redirect: {
            permanent: false,
            destination: "/signin"
         },
      }
   }
   const { id } = validateToken(req.cookies.SPOTIFY_ACCESS_TOKEN);
   const [ playlist ] = await prisma.playlist.findMany({
      where: {
         id: +query.id,
         userId: user.id,
      },
      include: {
         songs: {
            include: {
               artist: {
                  select: {
                     name:true,
                     id: true,
                  }
               }
            }
         }
      }
   })
   console.log("playlist",playlist);
   return {
      props: { 
         playlist: JSON.parse(JSON.stringify(playlist)) 
      }
   }
}
export default Playlist;