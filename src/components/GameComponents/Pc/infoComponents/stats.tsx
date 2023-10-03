import { getBaseStats, getStats } from "@/utils/pokemonStatsCalc"
import PokemonPortrait from "../portrait"
import { IPokemon, IStatList } from "@/types/models/Pokemon"

export function StatsInfo({ pokemon }: { pokemon: IPokemon }) {

    const lv50 = 50

    const base = getBaseStats(pokemon.specie.stats)

    const currentStats = getStats(lv50, base, pokemon.ivs, pokemon.evs)

    return <>
        <div className="flex">

            <div className="flex flex-col items-center gap-4">
                <PokemonPortrait pokemon={pokemon} />
                <PokemonGraph pokemon={pokemon} base={base} />
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
                    <div>{pokemon.evs.hp}</div>
                    <div>{currentStats.hp}</div>
                    {/* atk */}
                    <div className="text-[1.1rem]">ATK</div>
                    <div>{base.atk}</div>
                    <div>{pokemon.ivs.atk}</div>
                    <div>{pokemon.evs.atk}</div>
                    <div>{currentStats.atk}</div>
                    {/* def */}
                    <div className="text-[1.1rem]">DEF</div>
                    <div>{base.def}</div>
                    <div>{pokemon.ivs.def}</div>
                    <div>{pokemon.evs.def}</div>
                    <div>{currentStats.def}</div>
                    {/* sp atk */}
                    <div className="text-[1.1rem]">SATK</div>
                    <div>{base.sp_atk}</div>
                    <div>{pokemon.ivs.sp_atk}</div>
                    <div>{pokemon.evs.sp_atk}</div>
                    <div>{currentStats.sp_atk}</div>
                    {/* sp def */}
                    <div className="text-[1.1rem]">SDEF</div>
                    <div>{base.sp_def}</div>
                    <div>{pokemon.ivs.sp_def}</div>
                    <div>{pokemon.evs.sp_def}</div>
                    <div>{currentStats.sp_def}</div>
                    {/* speed */}
                    <div className="text-[1.1rem]">SPD</div>
                    <div>{base.speed}</div>
                    <div>{pokemon.ivs.speed}</div>
                    <div>{pokemon.evs.speed}</div>
                    <div>{currentStats.speed}</div>
                </div>
            </div>
        </div>
    </>
}

function KiteGraph(
    {
        stat,
        max,
        color,
        zIndex
    }: {
        stat: IStatList
        max: IStatList
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
                    (45 + (-20 * stat.sp_atk) / max.sp_atk) +
                    "% " +
                    (40 + (-40 * stat.sp_atk) / max.sp_atk) +
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
                    (40 + (-40 * stat.sp_def) / max.sp_def) +
                    "% " +
                    (50 + 0) +
                    "%)",
            }}
        />
    </>
}

function PokemonGraph({ pokemon, base }: {
    pokemon: IPokemon
    base: {
        hp: number
        atk: number
        def: number
        sp_atk: number
        sp_def: number
        speed: number
    }
}) {

    const pokemonLv = pokemon.lv + 100

    const maxIv = {
        hp: 31,
        atk: 31,
        def: 31,
        sp_atk: 31,
        sp_def: 31,
        speed: 31,
    }
    const maxEv = {
        hp: 255,
        atk: 255,
        def: 255,
        sp_atk: 255,
        sp_def: 255,
        speed: 255,
    }
    const maxNature = {
        hp: 1.1,
        atk: 1.1,
        def: 1.1,
        sp_atk: 1.1,
        sp_def: 1.1,
        speed: 1.1,
    }

    const maxStats = getStats(100, base, maxIv, maxEv, maxNature)
    const stats = getStats(pokemonLv, base)
    const ivStats = getStats(pokemonLv, base, pokemon.ivs)
    const evStats = getStats(pokemonLv, base, pokemon.ivs, pokemon.evs)

    console.log(maxStats.hp, stats.hp, stats.hp, ivStats.hp)

    return <>
        <div className="flex justify-center">
            <div className=" w-[10rem] h-[10rem] relative">
                <KiteGraph stat={maxStats} max={maxStats} color='gray' zIndex={1} />
                <KiteGraph stat={evStats} max={maxStats} color='orange' zIndex={2} />
                <KiteGraph stat={ivStats} max={maxStats} color='yellow' zIndex={3} />
                <KiteGraph stat={stats} max={maxStats} color='cyan' zIndex={4} />
            </div>
        </div>
    </>
}
