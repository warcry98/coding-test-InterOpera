import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { ChatDialog } from "./chat-dialog";

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");

  useEffect(() => {
    const handleGeminiAIChat = (e) => {
      const customEvent = e;
      if (customEvent.detail?.initialPrompt) {
        setInitialPrompt(customEvent.detail.initialPrompt);
        setIsOpen(true);
      }
    };

    window.addEventListener("openGeminiAIChat", handleGeminiAIChat);
    return () => {
      window.removeEventListener("openGeminiAIChat", handleGeminiAIChat);
    };
  }, []);

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

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-auto py-3 px-4 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          <span>Ask Sales Assistant</span>
        </Button>
      </motion.div>
    </>
  );
}
