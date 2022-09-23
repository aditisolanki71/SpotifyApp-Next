import { NextRequest, NextResponse } from "next/server";
//middleware will run on every single route signin or signup
const signedinPages = ['/','/playlist','/library'];
//not a frontend component like home or not seed file,but it is in a web worker environment
export default function middleware(req: NextRequest) {
   console.log("*********middleware called*************")
   if(signedinPages.find((p) => p === req.nextUrl.pathname)) {
      // const token = req.cookies.SPOTIFY_ACCESS_TOKEN;
      // if(!token) {
      //    return NextResponse.redirect('/signin')
      // }
      const token = req.cookies.get("SPOTIFY_ACCESS_TOKEN");
      console.log("token is",token);
      if(!token) {
         const url = req.nextUrl.clone();
         url.pathname = "/signin";
         return NextResponse.redirect(url)
      }
   }
}