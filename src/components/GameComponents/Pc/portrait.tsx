import { IPokemon } from "@/types/models/Pokemon";
import Image from 'next/image'

export default function PokemonPortrait({ pokemon }: { pokemon: IPokemon }) {

    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.is_egg ? "egg" : pokemon.specie.id}.png`
    return <>
        <div className="bg-gray-500 border border-white p-1 rounded-lg">
            <div className="w-[10rem] h-[10rem] bg-gray-900 rounded-lg border border-white" >
                {
                    pokemon &&
                    <Image
                        className="-scale-x-[1]"
                        src={url}
                        height={100}
                        width={100}
                        alt={`${pokemon.is_egg ? "Pokemon Egg" : pokemon.specie.name} image`}
                    />
                }
            </div>
        </div>
    </>
}