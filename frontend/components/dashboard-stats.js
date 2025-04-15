import { motion } from "framer-motion";
import { DollarSign, Users, BarChart3, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function DashboardStats({ salesReps }) {
  const totalDealValue = salesReps.reduce(
    (total, rep) => total + rep.deals.reduce((sum, deal) => sum + deal.value, 0),
    0,
  )

  const closedWonDeals = salesReps.reduce(
    (total, rep) => total + rep.deals.filter((deal) => deal.status === "Closed Won").length,
    0,
  )

  const totalDeals = salesReps.reduce((total, rep) => total + rep.deals.length, 0)

  const winRate = totalDeals > 0 ? Math.round((closedWonDeals / totalDeals) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Total Sales</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  ${totalDealValue.toLocaleString()}
                </h3>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Win Rate</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{winRate}%</h3>
              </div>
              <div className="bg-green-500/10 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Total Deals</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{totalDeals}</h3>
              </div>
              <div className="bg-purple-500/10 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800 shadow-md overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">Sales Reps</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{salesReps.length}</h3>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}