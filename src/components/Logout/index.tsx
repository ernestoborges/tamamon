'use client'

import { signOut } from "next-auth/react"

export default function LogOut({ children }: { children: React.ReactNode }) {

    return <>
        <button onClick={() => signOut()}>
            {children}
        </button>
    </>
}