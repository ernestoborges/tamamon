import { PokemonTypeLabel } from "@/components/PokemonTypeLabel";
import { IPokemon, IStatList } from "@/types/models/Pokemon";
import PokemonPortrait from "../portrait";
import { useRouter } from "next/navigation";
import { getPokemonHeight, getPokemonSizeTag, getPokemonWeight } from "@/utils/pokemonScalarSizeCalc";

export function MainInfo({ pokemon }: { pokemon: IPokemon }) {

    const router = useRouter();

    const changeBuddy = async (pokemon: IPokemon) => {
        try {
            const res = await fetch(`http://localhost:3000/api/update-buddy`, {
                method: 'POST',
                body: JSON.stringify({ pokemon }),
            });
            if (res.ok) {
                return router.refresh()
            }
            return console.log("Changing buddy: Server Error")
        } catch (error) {
            console.log(`Error fetching buddy: ${error}`)
        }
    }

    return <>
        <div className="flex h-full flex-col">
            <div className="flex flex-grow flex-col">
                <div className="flex justify-between items-start gap-4 ">
                    <div className="flex flex-col gap-4">
                        <PokemonPortrait pokemon={pokemon} />
                        <div className="flex flex-col justify-between ">
                            {
                                pokemon.specie.types.length > 1
                                    ? <>
                                        <PokemonTypeLabel type={pokemon.specie.types.find(type => type.slot === 1)!.name} />
                                        <PokemonTypeLabel type={pokemon.specie.types.find(type => type.slot === 2)!.name} />
                                    </>
                                    : <>
                                        <PokemonTypeLabel type="default" />
                                        <PokemonTypeLabel type={pokemon.specie.types.find(type => type.slot === 1)!.name} />
                                    </>
                            }
                        </div>
                    </div>
                    <div className="flex-1">
                        <ul className="h-full flex flex-col justify-center">
                            <li className="flex justify-between capitalize"><span>Id:</span>{pokemon.specie.id}</li>
                            <li className="flex justify-between "><span>Level:</span>{pokemon.lv}</li>
                            <li className="flex justify-between "><span>Specie:</span><span className="capitalize">{pokemon.specie.name}</span></li>
                            <li className="flex justify-between "><span>Height:</span><span>{`${getPokemonHeight(pokemon.wh_scalar.height, pokemon.specie.height).toFixed(2)} m`}</span></li>
                            <li className="flex justify-between "><span>Weight:</span><span>{`${getPokemonWeight(pokemon.wh_scalar.weight, pokemon.wh_scalar.height, pokemon.specie.weight, pokemon.specie.height).toFixed(2)} kg`}</span></li>
                            <li className="flex justify-between "><span>Size:</span><span>{getPokemonSizeTag(pokemon.wh_scalar.height)}</span></li>

                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end items-center">
                <button
                    className="bg-gray-800 border border-white rounded-lg p-2"
                    onClick={() => changeBuddy(pokemon)}
                >
                    select buddy
                </button>
            </div>
        </div>
    </>
}


