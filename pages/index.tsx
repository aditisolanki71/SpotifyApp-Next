import Head from 'next/head'
import { Image } from '@chakra-ui/react'
import GradientLayout from '../components/GradientLayout'
import styles from '../styles/Home.module.css'
import { Box, Flex, Text} from "@chakra-ui/layout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";
const Home = ({artists}) => {
 const { user} = useMe();
  return (
      <GradientLayout 
        color="red"
        roundImage
        title={`${user?.firstName} ${user?.lastName}`}
        subtitle="Profile"
        image="/images/profile/aditi.jpg"
        description={`${user?.playlistsCount} Public Playlist`}
      >
        <Box color="white" paddingX="40px">
          <Box marginBottom="20px">
            <Text fontSize="2xl" fontWeight="bold">Top artist of this month</Text> 
            <Text fontSize="md" fontWeight="bold">only visible to you</Text> 
          </Box>
          <Flex justify="space-between">
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  borderRadius="100%"
                  src="/images/profile/img1.jpg"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
          </Flex>
        </Box>
      </GradientLayout>
    )
}
// export const getServerSideProps = async () => {
//   const artists = await prisma.artist.findMany({});
//   console.log("*****Artists*****",artists);
//   return {
//     props: {
//       artists: artists
//     }
//   }
// }

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})
  console.log("*****Artists*****",artists);
  return {
    // props: { artists },
    props: { 
      artists: JSON.parse(JSON.stringify(artists)) 
    } 
  }
}
export default Home;