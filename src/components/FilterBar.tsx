import { useEffect, useState, type FC } from "react";
import useTaskStore from "../store/useTaskStore";
import { useDebounce } from "../hooks/useDebounce";
import { Search } from "lucide-react";

const FilterBar: FC = () => {
    const { setSearchText } = useTaskStore()
    const [inputValue, setInputValue] = useState<string>('')
    const debouncedValue = useDebounce(inputValue, 300)

    useEffect(() => {
        setSearchText(debouncedValue)
    }, [debouncedValue, setSearchText])

    return (
        <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Buscar por título ou tag..."
                className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-small bg-white"
            />
        </div>
    )
}

export default FilterBar