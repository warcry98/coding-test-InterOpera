import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Building,
  CheckCircle,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  PieChart,
  XCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SalesChart } from "./sales-chart";
import { Progress } from "./ui/progress";
import { useEffect, useState } from "react";
import { ChatDialog } from "./chat/chat-dialog";

export function SalesRepDetails({ salesRep }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");

  useEffect(() => {
    setInitialPrompt(
      `Tell me about ${salesRep.name}'s sales performance and suggest ways to improve.`,
    );
  }, [salesRep]);

  const totalDealValue = salesRep
    ? salesRep.deals.reduce((sum, deal) => sum + deal.value, 0)
    : 0;
  const closedWonValue = salesRep
    ? salesRep.deals
        .filter((deal) => deal.status === "Closed Won")
        .reduce((sum, deal) => sum + deal.value, 0)
    : 0;
  const progressPercentage =
    totalDealValue > 0
      ? Math.round((closedWonValue / totalDealValue) * 100)
      : null;

  const getDealStatusIcon = (status) => {
    switch (status) {
      case "Closed Won":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "In Progress":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "Closed Lost":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getDealStatusClass = (status) => {
    switch (status) {
      case "Closed Won":
        return "text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-400";
      case "In Progress":
        return "text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400";
      case "Closed Lost":
        return "text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400";
      default:
        return "";
    }
  };

  const getRegionColor = (region) => {
    switch (region) {
      case "North America":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Europe":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Asia-Pacific":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "South America":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "Middle East":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300";
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            initialPrompt={initialPrompt}
          />
        )}
      </AnimatePresence>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Button variant="ghost" className="mb-4">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-betweem gap-4">
            <div>
              <h1 className="text-3xl font-bold">{salesRep.name}</h1>
              <div className="flex items-center text-slate-600 dark:text-slate-400 mt-1">
                <Briefcase className="h-4 w-4 mr-1" />
                {salesRep.role}
                <span className="mx-2">•</span>
                <MapPin className="h-4 w-4 mr-1" />
                <Badge
                  variant="outline"
                  className={`font-normal ml-1 ${getRegionColor(salesRep.region)}`}
                >
                  {salesRep.region}
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Tabs
              defaultValue="deals"
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4"
            >
              <TabsList className="mb-4 grid grid-cols-3 h-auto p-1 bg-slate-100 dark:bg-slate-700">
                <TabsTrigger value="deals" className="py-2">
                  Deals
                </TabsTrigger>
                <TabsTrigger value="clients" className="py-2">
                  Clients
                </TabsTrigger>
                <TabsTrigger value="analytics" className="py-2">
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="deals" className="space-y-4 mt-2">
                {salesRep.deals.map((deal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="border-slate-200 dark:border-slate-700 overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div className="flex items-center">
                            {getDealStatusIcon(deal.status)}
                            <span className="ml-2 font-medium text-lg">
                              {deal.client}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              variant="secondary"
                              className={`${getDealStatusClass(deal.status)}`}
                            >
                              {deal.status}
                            </Badge>
                            <span className="font-bold text-lg flex items-center">
                              <DollarSign className="h-4 w-4" />
                              {deal.value.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="clients" className="space-y-4 mt-2">
                {salesRep.clients.map((client, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="border-slate-200 dark:border-slate-700 overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-lg">
                              {client.name}
                            </h3>
                            <div className="flex items-center text-slate-600 dark:text-slate-400">
                              <Building className="h-4 w-4 mr-1" />
                              {client.industry}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            <span className="text-sm">{client.contact}</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="analytics" className="mt-2">
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <PieChart className="h-5 w-5 mr-2 text-blue-500" />
                      Deal Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SalesChart salesRep={salesRep} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="border-slate-200 dark:border-slate-700 overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm font-medium">
                      <span>Deal Success Rate</span>
                      <span>{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="text-sm text-green-600 dark:text-green-400 mb-1">
                        Closed Won
                      </div>
                      <div className="text-xl font-bold">
                        ${closedWonValue.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                        Total Value
                      </div>
                      <div className="text-xl font-bold">
                        ${totalDealValue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {salesRep.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="font-normal text-sm py-1 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700 overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                <CardTitle className="text-lg">Ask AI Assistant</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Get insights about {salesRep.name}'s performance using our AI
                  assistant.
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => setIsOpen(true)}
                >
                  Analyze Performance
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
