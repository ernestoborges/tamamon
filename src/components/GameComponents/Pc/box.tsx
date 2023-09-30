'use client'
import { IPokemon } from "@/types/models/Pokemon";
import { Dispatch, SetStateAction, useState } from "react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi"
import Image from 'next/image'

export function PokemonBox({
    pokemons,
    setSelectedPokemon
}: {
    pokemons: IPokemon[],
    setSelectedPokemon: (pokemons: IPokemon) => void
}) {


    const [page, setPage] = useState<number>(0)
    const [selectedCell, setSelectedCell] = useState<number>(0)

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

    const handleCellClick = (index: number) => {
        setSelectedCell(page + index)
        setSelectedPokemon(pokemons[page + index])
    }

    const arr = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    ]


    return <>
        <section className="w-full flex justify-center">
            <div className="w-[23.5rem]" >
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
                                    className={`w-[3.5rem] h-[3.5rem] bg-slate-800 rounded-2xl p-1`}
                                    style={{
                                        border: `0.1rem solid ${selectedCell === page + i ? "red" : "white"}`
                                    }}
                                >
                                    {
                                        pokemons.length > (page * 30) + i &&
                                        <CustomImage
                                            pokemon={pokemons[page + i]}
                                            selected={selectedCell === (page * 30) + i}
                                            click={() => handleCellClick(i)}
                                        />
                                    }
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </section >
    </>
}

function CustomImage({ pokemon, click, selected }: { pokemon: IPokemon, click: () => void, selected: boolean }) {

    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${pokemon.is_egg ? "egg" : pokemon.specie.id}.png`
    return <>
        <Image
            className={`w-full h-full object-cover ${selected ? "selected-box" : ""}`}
            onClick={click}
            src={url}
            height={48}
            width={48}
            alt={`pokemon icon`}
        />
    </>
}