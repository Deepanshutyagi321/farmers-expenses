import "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth"{
    interface User{
        _id?: string,
        email?: string,
        username?: string
    }
   interface Session {
    user:{
        id?: string,
        email?: string,
        username?: string
    } & DefaultSession["user"]

    }
}

declare module "next-auth/jwt"{
    interface JWT{
        _id?: string,
        isVerified?: boolean,
        isAcceptingMessages?:boolean
        username?: string
    }
}
