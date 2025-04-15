import { Dashboard } from "@/components/dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <Suspense>
        <Dashboard />
      </Suspense>
    </main>
  );
}
