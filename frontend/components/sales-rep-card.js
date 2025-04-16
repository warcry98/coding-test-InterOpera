import Link from "next/link";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Briefcase, CheckCircle, ChevronRight, Clock, Users, XCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ToolTip, ToolTipContent, ToolTipProvider, ToolTipTrigger } from "./ui/tooltip";

export function SalesRepCard({ salesRep, viewMode }) {
  const totalDealValue = salesRep.deals.reduce((sum, deal) => sum + deal.value, 0)
  const closedWonValue = salesRep.deals
    .filter((deal) => deal.status === "Closed Won")
    .reduce((sum, deal) => sum + deal.value, 0)
  const progressPercentage = totalDealValue > 0 ? Math.round((closedWonValue / totalDealValue) * 100) : 0

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  const getDealStatusIcon = (status) => {
    switch (status) {
      case "Closed Won":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "Closed Lost":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getRegionColor = (region) => {
    console.log(region)
    switch (region) {
      case "North America":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Europe":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Asia-Pacific":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "South America":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "Middle East":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300"
    }
  }

  return (
    <motion.div variants={item}>
      <Card className="h-full flex flex-col justify-between overflow-hidden hover:shadow-lg transition-shadow duration-300 border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{salesRep.name}</CardTitle>
            <Badge variant="outline" className={`font-normal ${getRegionColor(salesRep.region)}`}>
              {salesRep.region}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <Briefcase className="h-4 w-4 mr-1" />
            {salesRep.role}
          </div>
        </CardHeader>
        <CardContent className="pb-2 flex-1">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1 text-sm font-medium">
                <span>Deal Success Rate</span>
                <span>{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <Users className="h-4 w-4 mr-1 text-blue-500" />
                Clients: {salesRep.clients.length}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {salesRep.clients.slice(0, 2).map((client, index) => (
                  <ToolTipProvider key={index}>
                    <ToolTip>
                      <ToolTipTrigger asChild>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded p-2 text-xs truncate">{client.name}</div>
                      </ToolTipTrigger>
                      <ToolTipContent className="bg-slate-100 dark:bg-slate-800">
                        <p>{client.industry}</p>
                        <p className="text-xs">{client.contact}</p>
                      </ToolTipContent>
                    </ToolTip>
                  </ToolTipProvider>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Recent Deals</h4>
              <ul className="space-y-2">
                {salesRep.deals.slice(0, 3).map((deal, index) => (
                  <li key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      {getDealStatusIcon(deal.status)}
                      <span className="ml-1.5 truncate max-w-[120px]">{deal.client}</span>
                    </div>
                    <span className="font-medium">${(deal.value / 1000).toFixed(1)}k</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Skills</h4>
              <div className="flex flex-wrap gap-1">
                {salesRep.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline">
            <Link href={`/${salesRep.id}`} className="flex items-center justify-center">
                View Details
                <ChevronRight className="h-4 w-4 ml-1"/>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}