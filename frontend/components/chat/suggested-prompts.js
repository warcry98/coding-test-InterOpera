import { motion } from "framer-motion";
import { Button } from "../ui/button";

export function SuggestedPrompts({ onPromptSelect }) {
  const prompts = [
    "Analyze the top performer's strategies",
    "Compare sales across different regions",
    "How can we improve our closing rate?",
    "Identify trends in our sales data",
  ];

  return (
    <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
      <p className="text-base font-medium text-blue-800 dark:text-blue-300 mb-3">
        Try one of these questions:
      </p>
      <div className="flex flex-col gap-2">
        {prompts.map((prompt, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              onClick={() => onPromptSelect(prompt)}
              className="w-full justify-start text-left text-base py-3 px-4 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700"
            >
              {prompt}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
