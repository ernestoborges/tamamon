'use client'

import { IPokemon } from "@/types/models/Pokemon"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi"




export function PcComponent({ pokemons }: { pokemons: Array<any> }) {
    const router = useRouter();

    const changeBuddy = async (pokemon: IPokemon) => {

        try {
            const res = await fetch(`http://localhost:3000/api/update-buddy`, {
                method: 'POST',
                body: JSON.stringify({ pokemon }),
            });
    
            if(res.ok){
                router.refresh()
            } else {
                console.log("Não foi atualizado")
            }
            return res.json()
    
        } catch (error) {
            console.log(`Error fetching buddy: ${error}`)
        }
    }

    const arr = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    ]

    const [page, setPage] = useState(0)
    const [selectedPokemon, setSelectedPokemon] = useState<IPokemon | null>(null)

    function handleBackward() {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    function handleForward() {
        if (page < arr.length - 1) {
            setPage(page + 1)
        }
    }

    return <>
        <div>
            <section className="">
                {
                    selectedPokemon &&
                    <div>
                        <div className="flex items-stretch">
                            <div>
                                <div className="capitalize">Name: {selectedPokemon.is_egg ? "Egg" : selectedPokemon.name}</div>
                                <div >
                                    {
                                        selectedPokemon &&
                                        <Image
                                            className="-scale-x-[1]"
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.is_egg ? "egg" : selectedPokemon.specie.id}.png`}
                                            height={100}
                                            width={100}
                                            alt={`${selectedPokemon.is_egg ? "Pokemon Egg" : selectedPokemon.specie.name} image`}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="flex-1">
                                <ul className="h-full flex flex-col justify-center">
                                    <li>specie: {selectedPokemon.specie.name}</li>
                                    <li className="flex gap-2">types:
                                        <span>{selectedPokemon.specie.types.find(type => type.slot === 1)!.name}</span>
                                        <span>{
                                            selectedPokemon.specie.types.length > 1 &&
                                            selectedPokemon.specie.types.find(type => type.slot === 2)!.name
                                        }</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <button
                                className="bg-gray-800 border border-white rounded-lg p-2"
                                onClick={() => changeBuddy(selectedPokemon)}
                            >
                                select as buddy
                            </button>
                        </div>
                    </div>
                }
            </section>
            <section>
                <div className="width-full flex justify-around p-4">
                    <button onClick={() => handleBackward()}><BiSolidLeftArrow /></button>
                    <h3>{`Box ${page + 1}`}</h3>
                    <button onClick={() => handleForward()}><BiSolidRightArrow /></button>
                </div>
                <div>
                    <ul className="grid grid-cols-6 gap-2 ">
                        {
                            arr[page].map((_, i) =>
                                <li
                                    key={i}
                                    className="w-[3.5rem] h-[3.5rem] border border-white bg-slate-800 rounded-2xl p-1"
                                >
                                    {
                                        pokemons.length > page + i &&
                                        <CustomImage pokemon={pokemons[page + i]} click={() => setSelectedPokemon(pokemons[page + i])} />
                                    }
                                </li>

                            )
                        }
                    </ul>
                </div>
            </section >
        </div >
    </>
}

function CustomImage({ pokemon, click }: { pokemon: any, click: () => void }) {

    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${pokemon.is_egg ? "egg" : pokemon.specie.id}.png`
    return <>
        <Image
            className="w-full h-full object-cover"
            onClick={click}
            src={url}
            height={48}
            width={48}
            alt={`pokemon icon`}
        />
    </>
}