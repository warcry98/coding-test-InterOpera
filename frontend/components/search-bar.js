import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/useDebounce";
import { Button } from "@/components/ui/button";

export function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearch("");
    onSearch("");
  };

  return (
    <div className="relative flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
        <Input
          type="text"
          placeholder="Search by name, role, region, or client..."
          value={search}
          onChange={handleChange}
          className="pl-10 pr-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear Search</span>
          </Button>
        )}
      </div>
    </div>
  );
}
