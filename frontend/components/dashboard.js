import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSalesReps } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardStats } from "@/components/dashboard-stats";

export function Dashboard() {
  const { dataSalesReps, errorSalesReps, isLoadingSalesReps } = useSalesReps();
  const [salesReps, setSalesReps] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log(dataSalesReps);
    if (dataSalesReps) {
      console.log("Data Loaded:", dataSalesReps["salesReps"][0]["name"]);
      setSalesReps(dataSalesReps["salesReps"]);
      setLoading(false);
    }
  }, [dataSalesReps]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      <DashboardHeader />

      {!loading && salesReps && <DashboardStats salesReps={salesReps} />}
    </div>
  );
}
