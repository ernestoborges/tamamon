"use client"
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image"
import { BiSolidRightArrow } from "react-icons/bi";
import { IPokemon } from "@/types/models/Pokemon";

const getBuddy = async () => {

    try {
        const res = await fetch(`http://localhost:3000/api/update-buddy`, {
            method: 'GET',
        });

        return res.json()

    } catch (error) {
        console.log(`Error fetching buddy: ${error}`)
    }
}

export function PokemonDisplay() {

    const [showBackground, setShowBackground] = useState(true);
    const [isWalking, setIsWalking] = useState(true);
    const [showGrid, setShowGrid] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [showDisplay, setShowDisplay] = useState(true);
    const [buddy, setBuddy] = useState<IPokemon | null>(null)

    const { data: session } = useSession()

    // const isShiny = session?.user?.pokemons[0].is_shiny
    // const pokemonName = session?.user?.pokemons[0].name
    // const isEgg = session?.user?.pokemons[0].is_egg

    const isShiny = false
    const pokemonName = 'bulbasaur'
    const isEgg = false
    // const n = 384;
    const n = "1";

    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${buddy ? buddy.specie.id : n}.png`


    const handleCanvasClick = () => {
        setIsPaused(true);

        setTimeout(() => {
            setIsPaused(false);
        }, 2000);
    };

    const handleShowDisplay = () => {
        setShowDisplay(!showDisplay)
    }

    useState(() => {
        const fetch = async () => {
            const response = await getBuddy()
            setBuddy(response)
        }
        fetch()
    }, [])

    return <>

        <div className="flex justify-center flex-col">
            <div
                onClick={handleCanvasClick}
                className="w-[30rem] flex bg-cover bg-bottom items-end overflow-hidden transition-all duration-500 "
                style={{
                    backgroundImage: showBackground
                        ? 'url("https://i.pinimg.com/originals/d3/88/57/d38857eeb3ff01be07c05fbfa80d3385.png")'
                        : "none",
                    height: showDisplay
                        ? "18rem"
                        : "0px"
                }}
            >
                <PokemonSprite
                    isWalking={isWalking}
                    showGrid={showGrid}
                    isPaused={isPaused}
                    isShiny={isShiny}
                    isEgg={isEgg}
                    pokemonName={pokemonName}
                />
            </div>
            <div className="h-[4rem] flex justify-between items-center gap-4">
                <div><Image className="-scale-x-[1]" src={url} width={48} height={48} alt="pokemon icon" /></div>
                <div className="flex-1 h-full flex items-end pb-1 capitalize">
                    {pokemonName}
                </div>
                <div>
                    <button
                        onClick={handleShowDisplay}
                        className={`transition-all duration-500 ${showDisplay ? "-rotate-90" : "rotate-90"}`}
                    >
                        <BiSolidRightArrow />
                    </button>
                </div>
            </div>
        </div>
    </>
}

function PokemonSprite({
    isWalking,
    isPaused,
    showGrid,
    isShiny,
    isEgg,
    pokemonName,
}: {
    isWalking: boolean
    isPaused: boolean
    showGrid: boolean
    isShiny: boolean
    isEgg: boolean
    pokemonName: string
}) {

    const [positionX, setPositionX] = useState(50);
    const [flipped, setFlipped] = useState(true);


    useEffect(() => {
        if (isWalking) {
            let animationId: number;

            const moveCharacter = () => {
                if (!isPaused && !isEgg) {
                    const step = flipped ? 0.5 : -0.5;
                    setPositionX((prevX) => prevX + step);
                    if (positionX > 250) {
                        setFlipped(false);
                    } else if (positionX < 50) {
                        setFlipped(true);
                    }
                }
            };

            animationId = requestAnimationFrame(moveCharacter);

            return () => cancelAnimationFrame(animationId);
        }
    }, [positionX, flipped, isPaused, isWalking]);

    return (
        <>
            <div
                className="w-full flex items-end relative pb-6"
                style={{
                    border: `0.1rem solid ${showGrid ? "blue" : "transparent"}`
                }}
            >
                <div
                    className="w-[0] flex absolute"
                    style={{
                        left: `${isWalking && !isEgg ? `${positionX}px` : "50%"}`,
                        border: `0.1rem solid ${showGrid ? "green" : "transparent"}`,
                        transform: `scaleX(${isWalking ? (flipped ? -1 : 1) : 1}) translateX(50%)`,
                        transformOrigin: "50% 50%"
                    }}
                >
                    {isEgg ? (
                        <img
                            className="pokemon-egg max-w-none w-[10rem]"
                            src="/egg.png"
                        />
                    ) : (
                        <img
                            className="max-w-none transform -translate-x-1/2"
                            src={`https://projectpokemon.org/images/${isShiny ? "shiny" : "normal"
                                }-sprite/${pokemonName}${isPaused ? "-3" : ""}.gif`}
                            style={{
                                border: `0.1rem solid ${showGrid ? "yellow" : "transparent"}`,
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
