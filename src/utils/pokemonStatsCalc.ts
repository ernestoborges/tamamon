import { IStat, IStatList } from "@/types/models/Pokemon"

export function getBaseStats(stats: IStat[]) {
    const base = {
        hp: stats[0].base_stat,
        atk: stats[1].base_stat,
        def: stats[2].base_stat,
        sp_atk: stats[3].base_stat,
        sp_def: stats[4].base_stat,
        speed: stats[5].base_stat
    }
    return base
}

function hpCalc(L: number, B: number, IV: number, EV: number) {
    const value = ((2 * B + IV + EV / 4) * L) / 100 + L + 10;
    return Math.floor(value);
}

function statCalc(L: number, B: number, IV: number, EV: number, N: number) {
    const value = Math.floor(((2 * B + IV + EV / 4) / 100) * L + 5) * N;
    return Math.floor(value);
}


export function getStats(lv: number, base: IStatList, ivs?: IStatList, evs?: IStatList, n?: IStatList) {

    const zeroObj = {
        hp: 0,
        atk: 0,
        def: 0,
        sp_atk: 0,
        sp_def: 0,
        speed: 0,
    }
    const onesObj = {
        hp: 1,
        atk: 1,
        def: 1,
        sp_atk: 1,
        sp_def: 1,
        speed: 1,
    }
    const IVS = ivs ? ivs : zeroObj
    const EVS = evs ? evs : zeroObj
    const N = n ? n : onesObj

    const currentStats = {
        hp: hpCalc(lv, base.hp, IVS.hp, EVS.hp),
        atk: statCalc(lv, base.atk, IVS.atk, EVS.atk, N.atk),
        def: statCalc(lv, base.def, IVS.def, EVS.def, N.def),
        sp_atk: statCalc(lv, base.sp_atk, IVS.sp_atk, EVS.sp_atk, N.sp_atk),
        sp_def: statCalc(lv, base.sp_atk, IVS.sp_def, EVS.sp_def, N.sp_def),
        speed: statCalc(lv, base.speed, IVS.speed, EVS.speed, N.speed),
    }

    return currentStats
}