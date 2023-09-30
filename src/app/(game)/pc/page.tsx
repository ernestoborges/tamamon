import { PcComponent } from "@/components/GameComponents/Pc";
import Newpokemon from "@/components/GameComponents/Pc/newpokemon";
import Pokedex from "@/lib/models/pokedex.model";
import Pokemon from "@/lib/models/pokemon.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { headers } from "next/headers"

const getData = async () => {

    try {
        const res = await fetch(`http://localhost:3000/api/pokemons`, {
            method: 'GET',
            cache: "no-store",
            headers: headers()
        });

        if (!res.ok) {
            console.log("Fetch data error")
            return []
        }

        return res.json()

    } catch (error) {
        console.log(`Error fetching pokemons: ${error}`)
    }
}



export default async function MenuPc() {

    const data = await getData()
    return <>
        <div className="w-[32rem] flex justify-between">
            Your PC
            <Newpokemon />
        </div>
        <PcComponent pokemons={data.pokemons} />
    </>
}