import { Box } from "@chakra-ui/layout";
import Sidebar from "./sidebar";
const PlayerLayout = ({children}) => {
   return (
      // responsive design using viewport height and viewport width
      <Box width="100vw" height="100vh">
         <Box position="absolute" top="0" width="250px" left="0">
            <Sidebar/>
         </Box>
         <Box marginLeft="250px">
            {children}
         </Box>
         <Box position="absolute" left="0" bottom="0">
            Player
         </Box>
      </Box>
   )
}
export default PlayerLayout;