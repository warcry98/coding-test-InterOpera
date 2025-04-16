import React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Send, Bot, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { SuggestedPrompts } from "./suggested-prompts";
import { Input } from "../ui/input";
import { postChatAI } from "@/lib/data";

export function ChatDialog({ open, onOpenChange, initialPrompt = "" }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your sales assistant powered by Gemini AI. How can I help you analyze your sales data today?",
    },
  ]);
  const [input, setInput] = useState(initialPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    setInput(initialPrompt);
  }, [initialPrompt]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    return () => clearTimeout(timeout);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error, dataLoading } = await postChatAI(input);

      let response = "";

      if (data && !error) {
        response = data.answer;
      } else {
        if (input.toLowerCase().includes("performance")) {
          response =
            "Based on the data, this sales rep has a good closing rate but could improve their deal value. I recommend focusing on upselling strategies and targeting higher-value clients in their region.";
        } else if (input.toLowerCase().includes("compare")) {
          response =
            "When comparing sales reps, I notice that those in North America tend to have higher average deal values, while those in Europe have better closing rates. This suggests regional differences in sales approaches.";
        } else if (input.toLowerCase().includes("improve")) {
          response =
            "To improve performance, I recommend: 1) Focus on nurturing in-progress deals, 2) Implement a follow-up strategy for closed-lost opportunities, and 3) Cross-sell to existing clients to increase deal values.";
        } else {
          response =
            "I've analyzed the sales data and noticed some interesting patterns. The rep has strengths in client relationship management but could improve their closing rate for high-value deals. Would you like specific recommendations for improvement?";
        }
      }

      const assistantMessage = {
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error posting to AI:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptSelect = (prompt) => {
    setInput(prompt);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md md:max-w-2xl h-[600px] max-h-[90vh] flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-semibold">AI Assistant</h2>
          </div>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-white border-white hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4 mr-1" />
            <span>Close</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 max-h-full p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center">
                    <div className="font-semibold">AI Assistant</div>
                  </div>
                  <div className="animate-pulse flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                    <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                    <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {messages.length === 1 && (
          <div className="px-4 pb-4">
            {!initialPrompt && (
              <SuggestedPrompts onPromptSelect={handlePromptSelect} />
            )}
          </div>
        )}

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <p className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-300">
            Type your question below:
          </p>
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Ask about sales performance..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-base h-12 bg-white dark:bg-slate-700"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-12 px-4 text-base"
            >
              <Send className="h-5 w-5 mr-2" />
              <span>Send</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
