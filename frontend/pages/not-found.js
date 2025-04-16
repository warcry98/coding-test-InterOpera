import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">
        Sales Representative Not Found
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        We couldn't find the sales representative you're looking for. They might
        have been removed or the ID is incorrect.
      </p>
      <Button asChild>
        <Link href="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
