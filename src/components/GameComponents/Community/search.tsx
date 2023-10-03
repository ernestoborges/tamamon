'use client'
import { useState } from "react"

export default function FriendsSearch() {

    const [query, setQuery] = useState<string>("");
    const [trainers, setTrainers] = useState<{ username: string }[] | []>([])


    async function handleSearch() {

        const response = await fetch(`http://localhost:3000/api/find-trainers`, {
            method: "POST",
            body: JSON.stringify({ query })
        })

        if (!response.ok) return

        const data = await response.json()
        setTrainers(data)
    }

    async function handleRequestFriend(trainer: string) {

        const response = await fetch(`http://localhost:3000/api/friend-request`, {
            method: "POST",
            body: JSON.stringify({ trainer })
        })

    }


    return <>
        <div>
            <input className="text-black" type="text" name="username" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="find trainer" />
            <button onClick={() => handleSearch()}>find</button>
            <div>
                <ul className="flex flex-col gap-4 pt-4">
                    {
                        trainers.map((trainer, index) =>
                            <li
                                key={index}
                                className="w-full flex items-center justify-between"
                            >
                                {trainer.username}
                                <button
                                    className="w-[3rem] h-[3rem] bg-green-500 flex items-center justify-center rounded-lg"
                                    onClick={() => handleRequestFriend(trainer.username)}
                                >
                                    +
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    </>
}