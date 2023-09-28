// import { PokemonsComponent } from "@/components/GameComponents/Pokemons";
import { headers } from "next/headers"

const getData = async () => {

    try {
        const res = await fetch(`http://localhost:3000/api/pokemons`, {
            method: 'GET',
            cache: "no-store",
            headers: headers()
        });

        return res.json()

    } catch (error) {
        console.log(`Error fetching pokemons: ${error}`)
    }


}

export default async function MenuPokemon() {

    const data = await getData();


    return <>
        <div>pokemon</div>
        <div>
            <span>Pokemon:</span>
            {/* <ul>
                {
                    data &&
                    data.pokemons.map((pokemon, index: number) =>
                        <li key={index}>
                            <p>id: {pokemon.specie.id}</p>
                            <p>name: {pokemon.name}</p>
                            <div className="flex gap-4">type: <ul>{pokemon.specie.types.map((type, i) =>
                                <li key={i}>{type.name}</li>
                            )}</ul></div>
                            <p>Ivs</p>
                            <p>HP: {pokemon.ivs.hp}</p>
                            <p>Atk: {pokemon.ivs.atk}</p>
                            <p>Def: {pokemon.ivs.def}</p>
                            <p>Sp.Atk: {pokemon.ivs.sp_atk}</p>
                            <p>Sp.Def: {pokemon.ivs.sp_def}</p>
                            <p>Speed: {pokemon.ivs.speed}</p>
                        </li>
                    )
                }
            </ul> */}
        </div >
    </>
}