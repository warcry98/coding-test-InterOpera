import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSalesReps } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { SearchBar } from "@/components/search-bar";
import { FilterBar } from "@/components/filter-bar";

export function Dashboard() {
  const { dataSalesReps, errorSalesReps, isLoadingSalesReps } = useSalesReps();
  const [salesReps, setSalesReps] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    regions: ["all"],
    roles: ["all"],
    dealStatuses: ["all"],
  });

  useEffect(() => {
    setLoading(true);
    if (dataSalesReps) {
      setSalesReps(dataSalesReps["salesReps"]);
      setLoading(false);
    }
  }, [dataSalesReps]);

  const haneldFilterBarRender = () => {
    setFilterBarReady(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      <DashboardHeader />

      {!loading && salesReps && <DashboardStats salesReps={salesReps} />}

      <div className="mb-8">
        <div className="bg-white  dark:bg-slate-800 rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row gap-4">
            {!loading && salesReps && <SearchBar onSearch={handleSearch} />}
            <div className="flex flex-wrap gap-2 md:ml-auto">
              {!loading && salesReps && (
                <FilterBar
                  onFilterChange={handleFilterChange}
                  salesReps={salesReps}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
