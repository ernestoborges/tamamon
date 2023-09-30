'use client'
import { IPokemon } from "@/types/models/Pokemon"
import { useState } from "react"
import { PokemonBox } from "./box"
import { InfoContainer } from "./infoComponents"

export function PcComponent({ pokemons }: { pokemons: Array<any> }) {

    const [selectedPokemon, setSelectedPokemon] = useState<IPokemon>(pokemons[0])

    return <>
        <div>
            <InfoContainer selectedPokemon={selectedPokemon} />
            <PokemonBox
                pokemons={pokemons}
                setSelectedPokemon={setSelectedPokemon}
            />
        </div >
    </>
}

