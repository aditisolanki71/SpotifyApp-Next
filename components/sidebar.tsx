import NextImage from "next/image";
import {
   Box,
   List,
   ListItem,
   ListIcon,
   Divider,
   Center,
   LinkBox,
   LinkOverlay
} from "@chakra-ui/layout"
import { 
   MdHome,
   MdSearch,
   MdLibraryMusic,
   MdPlaylistAdd,
   MdFavorite,
   //RiSpotifyLine
 } from "react-icons/md"
const Sidebar = () => {
  return (
     //main outer box for layout
      <Box 
         width="100%" 
         height="calc(100vh - 100px)"
         bg="black" 
         paddingX="5px" 
         color="gray"
      >
      {/* inner box for content */}
      <Box paddingY="20px">
         {/* box for image */}
         <Box width="120px" marginBottom="20px" paddingX="20px">
            <NextImage src="/logo.svg" height={60} width={120}/>
         </Box>
      </Box>

      </Box>
    )
}
export default Sidebar;