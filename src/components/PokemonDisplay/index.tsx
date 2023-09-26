"use client"
import { useEffect, useState } from "react";

export function PokemonDisplay() {

    const [pokemon, setPokemon] = useState("charmander");
    const [showBackground, setShowBackground] = useState(true);
    const [isWalking, setIsWalking] = useState(true);
    const [isShiny, setIsShiny] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isEgg, setIsEgg] = useState(false);

    const handleCanvasClick = () => {
        setIsPaused(true);

        setTimeout(() => {
            setIsPaused(false);
        }, 2000);
    };

    useEffect(() => {
        if (isEgg) {
            setIsWalking(false);
        }
    }, [isEgg]);

    return <>

        <div className="flex justify-center">
            <div
                onClick={handleCanvasClick}
                className="w-[30rem] h-[20rem] flex bg-cover items-end pb-10 overflow-hidden"
                style={{
                    backgroundImage: showBackground
                        ? 'url("https://i.pinimg.com/originals/d3/88/57/d38857eeb3ff01be07c05fbfa80d3385.png")'
                        : "none",
                }}
            >
                <PokemonSprite
                    isWalking={isWalking}
                    isShiny={isShiny}
                    showGrid={showGrid}
                    isPaused={isPaused}
                    isEgg={isEgg}
                />
            </div>
        </div>
    </>
}

function PokemonSprite({
    isWalking,
    isPaused,
    isShiny,
    showGrid,
    isEgg,
}: {
    isWalking: boolean
    isPaused: boolean
    isShiny: boolean
    showGrid: boolean
    isEgg: boolean
}) {
    const [positionX, setPositionX] = useState(50);
    const [flipped, setFlipped] = useState(true);

    useEffect(() => {
        if (isWalking) {
            let animationId: number;

            const moveCharacter = () => {
                if (!isPaused) {
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
                className="w-full flex items-end relative"
                style={{
                    border: `0.1rem solid ${showGrid ? "blue" : "transparent"}`
                }}
            >
                <div
                    className="w-[0] flex absolute"
                    style={{
                        left: `${isWalking ? `${positionX}px` : "50%"}`,
                        border: `0.1rem solid ${showGrid ? "green" : "transparent"}`,
                        transform: `scaleX(${isWalking ? (flipped ? -1 : 1) : 1}) translateX(50%)`,
                        transformOrigin: "50% 50%"
                    }}
                >
                    {isEgg ? (
                        <img
                            src="egg.png"
                        />
                    ) : (
                        <img
                            className="max-w-none transform -translate-x-1/2"
                            src={`https://projectpokemon.org/images/${isShiny ? "shiny" : "normal"
                                }-sprite/charmander${isPaused ? "-3" : ""}.gif`}
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
