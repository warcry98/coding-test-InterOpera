import {
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowDownUp,
  Users,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SortOptions({ sortBy, sortOrder, onSortChange }) {
  const getSortIcon = () => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? (
        <ArrowUpAZ className="h-4 w-4 mr-2" />
      ) : (
        <ArrowDownAZ className="h-4 w-4 mr-2" />
      );
    } else if (sortBy === "deal_value") {
      return <DollarSign className="h-4 w-4 mr-2" />;
    } else if (sortBy === "client_count") {
      return <Users className="h-4 w-4 mr-2" />;
    }
    return <ArrowDownUp className="h-4 w-4 mr-2" />;
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "name":
        return `Name (${sortOrder === "asc" ? "A-Z" : "Z-A"})`;
      case "deal_value":
        return `Deal Value (${sortOrder === "asc" ? "Low-High" : "High-Low"})`;
      case "client_count":
        return `Client Count (${sortOrder === "asc" ? "Low-High" : "High-Low"})`;
      default:
        return "Sort By";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
        >
          {getSortIcon()}
          {getSortLabel()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="overflow-y-auto bg-white dark:bg-slate-800"
      >
        <DropdownMenuItem
          onClick={() => onSortChange("name")}
          className="cursor-pointer"
        >
          <ArrowUpAZ className="h-4 w-4 mr-2" />
          Name
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onSortChange("deal_value")}
          className="cursor-pointer"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Deal Value
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onSortChange("client_count")}
          className="cursor-pointer"
        >
          <Users className="h-4 w-4 mr-2" />
          Client Count
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
