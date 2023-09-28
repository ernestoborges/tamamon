import { PcComponent } from "@/components/GameComponents/Pc";
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
        <div>Your PC</div>

        <PcComponent pokemons={data.pokemons} />
    </>
}