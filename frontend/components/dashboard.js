import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSalesReps } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { SearchBar } from "@/components/search-bar";
import { FilterBar } from "@/components/filter-bar";
import { SalesRepCard } from "./sales-rep-card";

export function Dashboard() {
  const { dataSalesReps, errorSalesReps, isLoadingSalesReps } = useSalesReps();
  const [salesReps, setSalesReps] = useState(null);
  const [filteredReps, setFilteredReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    regions: ["all"],
    roles: ["all"],
    dealStatuses: ["all"],
  });
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    setLoading(true);
    if (dataSalesReps) {
      setSalesReps(dataSalesReps["salesReps"]);
      setLoading(false);
    }
  }, [dataSalesReps]);

  useEffect(() => {
    if (salesReps) {
      let result = [...salesReps];

      if (filters.regions && !filters.regions.includes("all")) {
        result = result.filter((rep) => filters.regions.includes(rep.region));
      }

      if (filters.roles && !filters.roles.includes("all")) {
        result = result.filter((rep) => filters.roles.includes(rep.role));
      }

      if (filters.dealStatuses && !filters.dealStatuses.includes("all")) {
        result = result.filter((rep) =>
          rep.deals.some((deal) => filters.dealStatuses.includes(deal.status)),
        );
        console.log(result);
      }

      setFilteredReps(result);
    }
  }, [salesReps, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      <DashboardHeader />

      {!loading && salesReps && <DashboardStats salesReps={salesReps} />}

      {!loading && salesReps && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8
      "
        >
          <div className="bg-white  dark:bg-slate-800 rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row gap-4">
              {!loading && salesReps && <SearchBar onSearch={handleSearch} />}
              <div className="flex flex-wrap gap-2 md:ml-auto">
                <FilterBar
                  onFilterChange={handleFilterChange}
                  salesReps={salesReps}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-400 mb-4"></div>
              <div className="h-4 w-32 bg-blue-300 rounded mb-2"></div>
              <div className="h-3 w-24 bg-blue-200 rounded"></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            variants={container}
            initial="hidden"
            animate="show"
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-6`}
          >
            {filteredReps.map((rep) => (
              <SalesRepCard key={rep.id} salesRep={rep} viewMode={viewMode} />
            ))}

            {filteredReps.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
                  <div className="text-amber-500 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    No results found
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    Try adjusting your search or filter criteria to find what
                    you're looking for.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
