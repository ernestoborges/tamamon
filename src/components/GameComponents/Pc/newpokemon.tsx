'use client'

import { useRouter } from "next/navigation";

export default function () {

    const router = useRouter()

    const newPokemon = async () => {
        const res = await fetch(`http://localhost:3000/api/new-pokemon`, {
            method: 'GET',
            cache: "no-store",
        });

        if (!res.ok) {
            return console.log("Generating pokemon data error")
        } else {
            router.refresh();
            return console.log("Pokemon generated")
        }
    }

    return <>
        <button
            className="border border-white p-1 pl-4 pr-4 rounded-lg"
            onClick={() => newPokemon()}
        >
            NewPokemon
        </button>
    </>
}