import { Box } from "@chakra-ui/layout";
import { Table, Thead, Tbody, Tr, Td, Th, IconButton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { formateDate, formatTime} from "../lib/formaters";
import { useStoreActions } from "easy-peasy";

const SongTable = ({songs}) => {
   const playSongs = useStoreActions((store: any) => store.changeActiveSongs)
   const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

   const handlePlay = (activeSong?) => {
      setActiveSong(activeSong || songs[0])
      playSongs(songs);
   }
   return (
     <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
         <IconButton 
            icon={<BsFillPlayFill fontSize="30px" />}
            aria-label="play"
            //colorSchema="green"
            //color="green"
            background="green"
            size="lg"
            isRound
            onClick={() => handlePlay()}
         /> 
         <Table variant="unstyled">
            <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
               <Tr>
                  <Th>#</Th>
                  <Th>Title</Th>
                  <Th>Date added</Th>
                  <Th>
                     <AiOutlineClockCircle />
                  </Th>
               </Tr>
            </Thead>
            <Tbody>
               {songs?.map((song,i)=> (
                  <Tr sx={{
                     transition: "all .3s",
                        '&:hover': {
                           bg: 'rgba(255,255,255,0.1)'
                        },
                  }}
                  key={song.id}
                  cursor="pointer"
                  onClick={() => handlePlay(song)}
                  >
                     <Td>{i + 1}</Td>
                     <Td>{song.name}</Td>
                     <Td>{song.createdAt.toString()}</Td>
                     {/* <Td>{formateDate(song.createdAt)}</Td> */}
                     {/* <Td>{formateTime(song.duration)}</Td> */}
                     <Td>{song.duration}</Td>
                  </Tr>
               ))}
            </Tbody>
         </Table>
      </Box>
     </Box>
   )
}
export default SongTable;