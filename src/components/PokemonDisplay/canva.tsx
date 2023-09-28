'use client'

import { useEffect, useState } from "react";

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
