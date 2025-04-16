"use client";

import { Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SalesRepDetails } from "@/components/sales-rep-details";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import { useSalesRep } from "@/lib/data";
import { SalesRepDetailsSkeleton } from "@/components/sales-rep-details-skeleton";

export default function SalesRepPage({ params }) {
  const router = useRouter();
  const { id } = router.query;

  const parsedId = id ? parseInt(id) : null;
  const { dataSalesRep, dataError, dataLoading } = useSalesRep(parsedId);

  useEffect(() => {
    console.log(dataSalesRep);
  }, [dataSalesRep]);

  if (dataError) return notFound();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main>
        <Suspense>
          {dataLoading ? (
            <SalesRepDetailsSkeleton />
          ) : (
            <SalesRepDetails salesRep={dataSalesRep} />
          )}
        </Suspense>
      </main>
    </ThemeProvider>
  );
}
