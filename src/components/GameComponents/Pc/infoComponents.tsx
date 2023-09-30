import { PokemonTypeLabel } from "@/components/PokemonTypeLabel";
import { IPokemon } from "@/types/models/Pokemon";
import { useRouter } from "next/navigation";
import PokemonPortrait from "./portrait";
import { useState } from "react";
import { cpSync } from "fs";


export function InfoContainer({ selectedPokemon }: { selectedPokemon: IPokemon }) {


    const [selectedOption, setSelectedOption] = useState(1)

    const handleShowOption = (option: number) => {
        switch (option) {
            case 1: return <MainInfo pokemon={selectedPokemon} />
            case 2: return <StatsInfo pokemon={selectedPokemon} />
            default: return <MainInfo pokemon={selectedPokemon} />
        }
    }

    const options = [1, 2]
    return <>
        <section className="flex flex-col gap-2">
            <div className="w-[32rem] h-[24rem] border border-white rounded-lg p-4 bg-gray-800">

                {
                    selectedPokemon &&
                    <>
                        {
                            handleShowOption(selectedOption)
                        }

                    </>
                }
            </div>
            <div className="flex gap-2">
                {
                    options.map((option, i) =>
                        <div
                            key={i}
                            onClick={() => setSelectedOption(option)}
                            className={`w-[3.6rem] bg-gray-${option === selectedOption ? "800" : "900"} border flex justify-center items-center border-${option === selectedOption ? "white" : "gray-800"} rounded-lg`}>
                            {option}
                        </div>
                    )
                }
            </div>
        </section>

    </>
}

function MainInfo({ pokemon }: { pokemon: IPokemon }) {

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
        <div className="flex flex-col">
            <div className="flex justify-between gap-4">
                <PokemonPortrait pokemon={pokemon} />
                <div className="flex-1">
                    <ul className="h-full flex flex-col justify-center">
                        <li className="flex justify-between capitalize"><span>Id:</span>{pokemon.specie.id}</li>
                        <li className="flex justify-between "><span>specie:</span><span>{pokemon.specie.name}</span></li>
                        <li className="flex justify-between ">
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
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div>Ivs</div>
                <div className="grid grid-cols-6 justify-items-center justify-center">
                    <span>hp</span>
                    <span>atk</span>
                    <span>s.atk</span>
                    <span>def</span>
                    <span>s.def</span>
                    <span>spd</span>
                    <span>{pokemon.ivs.hp}</span>
                    <span>{pokemon.ivs.atk}</span>
                    <span>{pokemon.ivs.sp_atk}</span>
                    <span>{pokemon.ivs.def}</span>
                    <span>{pokemon.ivs.sp_def}</span>
                    <span>{pokemon.ivs.speed}</span>
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
    </>
}


export function StatsInfo({ pokemon }: { pokemon: IPokemon }) {


    const lv50 = 50
    const pokemonLv = 100

    const base = {
        hp: pokemon.specie.stats[0].base_stat,
        atk: pokemon.specie.stats[1].base_stat,
        def: pokemon.specie.stats[2].base_stat,
        spatk: pokemon.specie.stats[3].base_stat,
        spdef: pokemon.specie.stats[4].base_stat,
        speed: pokemon.specie.stats[5].base_stat
    }

    const maxStats = {
        hp: hpCalc(100, base.hp, 31, 255),
        atk: statCalc(100, base.atk, 31, 255, 1.1),
        def: statCalc(100, base.def, 31, 255, 1.1),
        spatk: statCalc(100, base.spatk, 31, 255, 1.1),
        spdef: statCalc(100, base.spatk, 31, 255, 1.1),
        speed: statCalc(100, base.speed, 31, 255, 1.1),
    }

    const stats = {
        hp: hpCalc(100, base.hp),
        atk: statCalc(100, base.atk),
        def: statCalc(100, base.def),
        spatk: statCalc(100, base.spatk),
        spdef: statCalc(100, base.spatk),
        speed: statCalc(100, base.speed),
    }


    const ivStats = {
        hp: hpCalc(pokemonLv, base.hp, pokemon.ivs.hp),
        atk: statCalc(pokemonLv, base.atk, pokemon.ivs.atk),
        def: statCalc(pokemonLv, base.def, pokemon.ivs.def),
        spatk: statCalc(pokemonLv, base.spatk, pokemon.ivs.sp_atk),
        spdef: statCalc(pokemonLv, base.spatk, pokemon.ivs.sp_def),
        speed: statCalc(pokemonLv, base.speed, pokemon.ivs.speed),
    }

    const evStats = {
        hp: hpCalc(pokemonLv, base.hp, pokemon.ivs.hp, 0),
        atk: statCalc(pokemonLv, base.atk, pokemon.ivs.atk, 0),
        def: statCalc(pokemonLv, base.def, pokemon.ivs.def, 0),
        spatk: statCalc(pokemonLv, base.spatk, pokemon.ivs.sp_atk, 0),
        spdef: statCalc(pokemonLv, base.spatk, pokemon.ivs.sp_def, 0),
        speed: statCalc(pokemonLv, base.speed, pokemon.ivs.speed, 0),
    }

    const currentStats = {
        hp: hpCalc(lv50, base.hp, pokemon.ivs.hp, 0),
        atk: statCalc(lv50, base.atk, pokemon.ivs.atk, 0),
        def: statCalc(lv50, base.def, pokemon.ivs.def, 0),
        spatk: statCalc(lv50, base.spatk, pokemon.ivs.sp_atk, 0),
        spdef: statCalc(lv50, base.spatk, pokemon.ivs.sp_def, 0),
        speed: statCalc(lv50, base.speed, pokemon.ivs.speed, 0),
    }


    return <>
        <div className="flex">

            <div className="flex flex-col items-center gap-4">
                <PokemonPortrait pokemon={pokemon} />
                <div className="flex justify-center">
                    <div className=" w-[10rem] h-[10rem] relative">
                        <KiteGraph stat={maxStats} max={maxStats} color='gray' zIndex={1} />
                        <KiteGraph stat={evStats} max={maxStats} color='orange' zIndex={2} />
                        <KiteGraph stat={ivStats} max={maxStats} color='yellow' zIndex={3} />
                        <KiteGraph stat={currentStats} max={maxStats} color='cyan' zIndex={4} />
                    </div>
                </div>
            </div>
            <div className="w-full text-[1.2rem]">
                <div className="grid grid-cols-5 place-items-center">
                    <div></div>
                    <div className="text-[1.1rem]">Base</div>
                    <div className="text-[1.1rem]">IV</div>
                    <div className="text-[1.1rem]">EV</div>
                    <div className="text-[1.1rem]">Total</div>
                    {/* hp */}
                    <div className="text-[1.1rem]">HP</div>
                    <div>{base.hp}</div>
                    <div>{pokemon.ivs.hp}</div>
                    <div>0</div>
                    <div>{currentStats.hp}</div>
                    {/* atk */}
                    <div  className="text-[1.1rem]">ATK</div>
                    <div>{base.atk}</div>
                    <div>{pokemon.ivs.atk}</div>
                    <div>0</div>
                    <div>{currentStats.atk}</div>
                    {/* def */}
                    <div className="text-[1.1rem]">DEF</div>
                    <div>{base.def}</div>
                    <div>{pokemon.ivs.def}</div>
                    <div>0</div>
                    <div>{currentStats.def}</div>
                    {/* sp atk */}
                    <div className="text-[1.1rem]">SATK</div>
                    <div>{base.spatk}</div>
                    <div>{pokemon.ivs.sp_atk}</div>
                    <div>0</div>
                    <div>{currentStats.spatk}</div>
                    {/* sp def */}
                    <div className="text-[1.1rem]">SDEF</div>
                    <div>{base.spdef}</div>
                    <div>{pokemon.ivs.sp_def}</div>
                    <div>0</div>
                    <div>{currentStats.spdef}</div>
                    {/* speed */}
                    <div className="text-[1.1rem]">SPD</div>
                    <div>{base.speed}</div>
                    <div>{pokemon.ivs.speed}</div>
                    <div>0</div>
                    <div>{currentStats.speed}</div>
                </div>
            </div>
        </div>
    </>
}

function hpCalc(L: number, B: number, IV?: number, EV?: number) {

    const fIV = IV ? IV : 0;
    const fEV = EV ? EV : 0;
    const value = ((2 * B + fIV) + (fEV / 4) * L) / 100 + L + 10;
    return Math.floor(value);
}

function statCalc(L: number, B: number, IV?: number, EV?: number, N?: number) {
    const fL = L;
    const fIV = IV ? IV : 0;
    const fEV = EV ? EV : 0;
    const fN = N ? N : 1;
    const value = Math.floor(((2 * B + fIV + fEV / 4) / 100) * fL + 5) * fN;
    return Math.floor(value);
}

function KiteGraph(
    {
        stat,
        max,
        color,
        zIndex
    }: {
        stat: {
            hp: number
            atk: number
            def: number
            spatk: number
            spdef: number
            speed: number
        }
        max: {
            hp: number
            atk: number
            def: number
            spatk: number
            spdef: number
            speed: number
        }
        color: string
        zIndex: number
    }) {

    return <>
        <div
            className="absolute w-full h-full "
            style={{
                zIndex: zIndex,
                backgroundColor: color,
                clipPath:
                    "polygon(" +
                    (45 + (-20 * stat.spatk) / max.spatk) +
                    "% " +
                    (40 + (-40 * stat.spatk) / max.spatk) +
                    "%, " +
                    (55 + (20 * stat.hp) / max.hp) +
                    "% " +
                    (40 + (-40 * stat.hp) / max.hp) +
                    "%, " +
                    (60 + (40 * stat.atk) / max.atk) +
                    "% " +
                    (50 + 0) +
                    "%, " +
                    (55 + (20 * stat.def) / max.def) +
                    "% " +
                    (60 + (40 * stat.def) / max.def) +
                    "%, " +
                    (45 + (-20 * stat.speed) / max.speed) +
                    "% " +
                    (60 + (40 * stat.speed) / max.speed) +
                    "%, " +
                    (40 + (-40 * stat.spdef) / max.spdef) +
                    "% " +
                    (50 + 0) +
                    "%)",
            }}
        />
    </>
}