//same as redux
import { createStore, action} from "easy-peasy";
export const store = createStore({
   activeSongs: [],
   activeSong: null,
   //immer allows u to do mutable operation
   changeActiveSongs: action((state:any, payload) => {
      state.activeSongs = payload
   }),
   changeActiveSong: action((state:any, payload) => {
      state.activeSong = payload
   }),
})