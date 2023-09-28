'use client'
import { useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";

export default function DisplayFooter({ children }: { children: React.ReactNode }) {

    const [showDisplay, setShowDisplay] = useState(true);

    const handleShowDisplay = () => {
        setShowDisplay(!showDisplay)
    }
    return <>
        <div className="h-[4rem] flex justify-between items-center gap-4">
            {children}
        </div>
    </>
}