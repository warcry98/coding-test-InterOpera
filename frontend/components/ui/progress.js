import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Optional, remove if not using

const Progress = ({
  value = 0,
  className = "",
  styleType = "gradient", // "solid" | "striped" | "gradient"
  color = "bg-blue-500"
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(value);
    }, 100); // slight delay for animation trigger
    return () => clearTimeout(timeout);
  }, [value]);

  const styleClass = {
    solid: color,
    striped: `bg-[repeating-linear-gradient(45deg,theme(colors.blue.500),theme(colors.blue.500)_10px,theme(colors.blue.400)_10px,theme(colors.blue.400)_20px)] animate-stripes`,
    gradient: `bg-gradient-to-r from-blue-400 to-blue-600`
  }[styleType];

  return (
    <div
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
        className
      )}
    >
      <div
        className={cn(
          "h-full transition-all duration-1000 ease-out",
          styleClass
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export { Progress }