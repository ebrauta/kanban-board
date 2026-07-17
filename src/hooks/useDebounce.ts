/**
 * Retorna uma versão "atrasada" do valor, que só atualiza depois
 * que o usuário para de digitar por `delay` milissegundos.
 */

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => clearTimeout(timeoutId)
    }, [value, delay])
    return debouncedValue
}