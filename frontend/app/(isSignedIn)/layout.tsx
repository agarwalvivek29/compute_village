"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Layout({children}:any){
    const { isSignedIn } = useUser();
    const router = useRouter();

    if( !isSignedIn ){ 
        router.push('/')
    }

    return <>
        {children}
    </>
}