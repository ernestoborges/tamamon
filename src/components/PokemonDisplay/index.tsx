import { IPokemon } from "@/types/models/Pokemon";
import { headers } from "next/headers";
import DisplayFooter from "./footer";
import Image from 'next/image'
import { PokemonSprite, EggSprite, CanvaWrapper } from "./canva";
import PokemonIcon from "../PokemonIcon";

const getBuddy = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/update-buddy`, {
            method: 'GET',
            headers: headers(),
            cache: "no-store"
        });
        return res.json()
    } catch (error) {
        console.log(`Error fetching buddy: ${error}`)
    }
}

export async function PokemonDisplay() {
    const buddy: IPokemon = await getBuddy();
    const background = "https://i.pinimg.com/originals/d3/88/57/d38857eeb3ff01be07c05fbfa80d3385.png"
    const iconUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${!buddy || buddy.is_egg ? "egg" : buddy?.specie?.id}.png`
    const gifUrl = `https://projectpokemon.org/images/${buddy.is_shiny ? "shiny" : "normal"}-sprite/${buddy ? buddy.name : "charizard"}.gif`

    return <>

        <div className="flex justify-center flex-col">
            <CanvaWrapper>
                {
                    buddy.is_egg
                        ? <EggSprite>
                            <img
                                className="pokemon-egg max-w-none w-[10rem]"
                                src="/egg.png"
                                alt={`${buddy.name} Egg Buddy`}
                            />
                        </EggSprite>

                        : <PokemonSprite>
                            <img
                                className="max-w-none transform -translate-x-1/2"
                                src={gifUrl}
                                alt={`Buddy ${buddy.name}`}
                            />
                        </PokemonSprite>
                }

            </CanvaWrapper>
            <DisplayFooter>
                <div className="-scale-x-[1]">
                    <PokemonIcon
                        id={buddy.specie.id}
                        name={buddy.specie.name}
                        isEgg={buddy.is_egg}
                    />
                </div>
                <div className="flex-1 h-full flex items-end pb-1 capitalize">
                    {buddy ? buddy.is_egg ? "Egg" : buddy.name : "Missingno"}
                </div>
            </DisplayFooter>
        </div >
    </>
}