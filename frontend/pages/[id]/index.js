"use client";

import { Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SalesRepDetails } from "@/components/sales-rep-details";
import { useRouter } from "next/router";
import { getSalesRep, useSalesRep } from "@/lib/data";
import { SalesRepDetailsSkeleton } from "@/components/sales-rep-details-skeleton";
import NotFound from "../not-found";

export default function SalesRepPage() {
  const router = useRouter();
  const { id } = router.query;

  const parsedId = id ? parseInt(id) : null;
  const [dataSalesRep, setDataSalesRep] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (parsedId) {
      getSalesRep(parsedId).then(({ data, error, isLoading }) => {
        setDataSalesRep(data);
        setError(error);
        setIsLoading(isLoading);
      });
    }
  }, [parsedId]);

  if (error) {
    return <NotFound />;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main>
        <Suspense>
          {isLoading ? (
            <SalesRepDetailsSkeleton />
          ) : (
            <SalesRepDetails salesRep={dataSalesRep} />
          )}
        </Suspense>
      </main>
    </ThemeProvider>
  );
}
