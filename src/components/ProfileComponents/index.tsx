'use client'

import { useSession } from "next-auth/react"

export function ProfileComponent() {

    const { data: session } = useSession()

    return <>
        <div>
            <div>
                <span>Name:</span>
                <span>{session?.user?.username}</span>
            </div>
            <div>
                <span>Email:</span>
                <span>{session?.user?.email}</span>
            </div>
        </div>
    </>
}