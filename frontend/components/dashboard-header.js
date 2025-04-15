import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">Sales Team Dashboard</h1>
            <p className="text-blue-100">
              Monitor performance, track deals, and manage your sales
              representative
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
