import { Bot, User } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className="flex items-start gap-4 p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
      <div
        className={`flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full border-2 shadow ${
          isUser
            ? "bg-blue-500 text-white border-blue-300"
            : "bg-primary text-primary-foreground border-primary/30"
        }`}
      >
        {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>
      <div className="flex-1">
        <div className="mb-2 flex items-center">
          <div className="font-semibold text-base">
            {isUser ? "You" : "Sales Assistant"}
          </div>
        </div>
        <div className="prose prose-slate dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => (
                <p
                  className="text-slate-700 dark:text-slate-300 text-base sm:text-sm md:text-lg"
                  {...props}
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  className="bg-slate-100 dark:bg-slate-700 text-red-600 px-1 py-0.5 rounded sm:text-xs md:text-sm lg:text-base"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside text-slate-700 dark:text-slate-300 sm:text-xs md:text-sm lg:text-base"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside text-slate-700 dark:text-slate-300 sm:text-xs md:text-sm lg:text-base"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-500 hover:underline sm:text-xs md:text-sm lg:text-base"
                  {...props}
                />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
