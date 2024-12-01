import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react";

export default function Logout() {
    const { data: session, status } = useSession();
    if (status === 'authenticated') {
        return (
            <a className="cursor-pointer" onClick={() => signOut()}>Logout</a>
        )
    } else {
        return (
            <a className="cursor-pointer" onClick={() => signIn()}>Login</a>
        )
    }
    
}