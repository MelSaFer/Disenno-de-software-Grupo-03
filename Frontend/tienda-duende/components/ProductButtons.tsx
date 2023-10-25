'use client'

import { usePathname } from "next/navigation";

export default function ProductButton(){
    const pathName = usePathname()

    return (
        <button className="mt-1.5 flex w-full justify-center text-xs font-medium uppercase tracking-wide text-white" style={{ backgroundColor: 'black', color: 'white', padding: '20px'}}>
            Agregar al carrito
        </button>

    )
}
