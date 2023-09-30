export function PokemonTypeLabel({ type }: { type: string }) {

    return <>
        <div className="w-full uppercase text-[1.2rem] font-bold">
            {
                type !== "default" &&
                <div
                    className={`rounded-lg border border-gray-900 overflow-hidden flex justify-center p-2 pl-4 pr-4`}
                    style={{background: `var(--type-${type})`}}
                >
                    {type === "default" ? "" : type}
                </div>
            }
        </div>
    </>
}