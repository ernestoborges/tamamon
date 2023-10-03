import { IPokemon } from "@/types/models/Pokemon";
import { useState } from "react";
import { StatsInfo } from "./stats";
import { MainInfo } from "./main";


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