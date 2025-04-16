import { Bot, User } from "lucide-react";

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
          {message.content.split("\n").map((text, i) => (
            <p key={i} className="text-slate-700 dark:text-slate-300 text-base">
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
