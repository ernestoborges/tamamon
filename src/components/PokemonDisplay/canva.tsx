'use client'

import { useEffect, useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";

export function PokemonSprite({ children }: { children: React.ReactNode }) {

    const [positionX, setPositionX] = useState(50);
    const [flipped, setFlipped] = useState(true);
    const [isWalking, setIsWalking] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    const handleCanvasClick = () => {
        setIsPaused(true);

        setTimeout(() => {
            setIsPaused(false);
        }, 2000);
    };

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

    return <>

        <div
            className="w-full flex items-end relative pb-6"
        >
            <div
                className="w-[0] flex absolute"
                style={{
                    left: `${isWalking ? `${positionX}px` : "50%"}`,
                    transform: `scaleX(${isWalking ? (flipped ? -1 : 1) : 1}) translateX(50%)`,
                    transformOrigin: "50% 50%"
                }}
            >
                {children}
            </div>
        </div>
    </>
}

export function EggSprite({ children }: { children: React.ReactNode }) {
    return <>

        <div
            className="w-full flex items-end relative pb-6"
        >
            <div
                className="w-[0] flex absolute left-[50%] translate-x-[50%] origin-bottom"
            >
                {children}
            </div>
        </div>
    </>
}


export function CanvaWrapper({ children }: { children: React.ReactNode }) {

    const [showDisplay, setShowDisplay] = useState(true)

    const handleShowDisplay = () => {
        setShowDisplay(!showDisplay)
    }

    const background = "https://i.pinimg.com/originals/d3/88/57/d38857eeb3ff01be07c05fbfa80d3385.png"

    return <div className="relative">
        <div
            className="relative w-[30rem] flex bg-cover bg-bottom items-end overflow-hidden transition-all duration-500 "
            style={{
                backgroundImage: `url(${background})`,
                height: showDisplay ? '18rem' : "0"
            }}
        >
            {children}
        </div>
        <div className="absolute right-0 top-[100%] rounded-es-lg rounded-ee-lg pl-4 pr-4 border border-t-0 border-white bg-gray-800">
            <button
                onClick={handleShowDisplay}
                className={`transition-all duration-500 ${showDisplay ? "-rotate-90" : "rotate-90"}`}
            >
                <BiSolidRightArrow />
            </button>
        </div>
    </div>
}