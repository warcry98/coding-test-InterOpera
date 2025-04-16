import React from "react";
import { cn } from "@/lib/utils";

const Card = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 shadow-md overflow-hidden",
        className,
      )}
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
}

const CardTitle = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }) => {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
};

const CardFooter = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "flex items-center p-6 pt-0",
        className,
      )} 
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
