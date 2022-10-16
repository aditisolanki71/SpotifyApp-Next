import formatDuration from "format-duration";
export const formatTime = ( timeInSeconds = 0) => {
   return formatDuration(timeInSeconds * 1000) 
}
export const formateDate = (date: Date) => {
   console.log("date is",date);
   // return date.toLocaleDateString('en-US', {
   //    year: "numeric",
   //    month: "short",
   //    day: "numeric"
   // })
   return typeof date == "object" ?  date.toLocaleDateString('en-US', {
      year: "numeric",
         month: "short",
         day: "numeric"
   }) : "";
}