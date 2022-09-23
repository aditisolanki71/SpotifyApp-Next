import useSWR from "swr";
import fetcher from "./fetcher";

//get all user
export const useMe = () => {
   //swr is library ro do data fetch and store it on yr machine like redux
   //cache key where u wanna store
   const { data, error } = useSWR('/me',fetcher);
   return {
      user: data,
      isLoading: !data && !error,
      isError: error
   }
}

//get all playlist
export const usePlaylist = () => {
   const { data, error } = useSWR("/playlist",fetcher);
   console.log("hook data is",data);
   return {
      playlists: (data as any) || [],
      isLoading: !data && !error,
      isError: error
   }
}