import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSalesReps } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { SearchBar } from "@/components/search-bar";
import { FilterBar } from "@/components/filter-bar";
import { SalesRepCard } from "./sales-rep-card";
import { ChatButton } from "./chat/chat-button";
import { SortOptions } from "./sort-options";

export function Dashboard() {
  const { dataSalesReps } = useSalesReps();
  const [salesReps, setSalesReps] = useState(null);
  const [filteredReps, setFilteredReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    regions: ["all"],
    roles: ["all"],
    dealStatuses: ["all"],
  });
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
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

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          (rep) =>
            rep.name.toLowerCase().includes(query) ||
            rep.role.toLowerCase().includes(query) ||
            rep.region.toLowerCase().includes(query) ||
            rep.skills.some((skill) => skill.toLowerCase().includes(query)) ||
            rep.deals.some((deal) =>
              deal.client.toLowerCase().includes(query),
            ) ||
            rep.clients.some((client) =>
              client.name.toLowerCase().includes(query),
            ),
        );
      }

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
      }

      result.sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case "name":
            comparison = a.name.localeCompare(b.name);
            break;
          case "dealValue":
            const aTotal = a.deals.reduce((sum, deal) => sum + deal.value, 0);
            const bTotal = b.deals.reduce((sum, deal) => sum + deal.value, 0);
            comparison = aTotal - bTotal;
            break;
          case "clientCount":
            comparison = a.clients.length - b.clients.length;
            break;
          default:
            comparison = 0;
        }

        return sortOrder === "asc" ? comparison : -comparison;
      });

      setFilteredReps(result);
    }
  }, [salesReps, filters, sortBy, sortOrder, searchQuery]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (option) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortOrder("asc");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
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
              <SearchBar onSearch={handleSearch} />
              <div className="flex flex-wrap gap-2 md:ml-auto">
                <FilterBar
                  onFilterChange={handleFilterChange}
                  salesReps={salesReps}
                />
                <SortOptions
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
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

      <ChatButton />
    </div>
  );
}
