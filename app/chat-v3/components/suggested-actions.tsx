"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Message } from "ai";
import { memo } from "react";
import { saveMessages } from "../actions";
interface SuggestedActionsProps {
  chatId: string;
  append: (message: Message) => Promise<string | null | undefined>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
function PureSuggestedActions({
  chatId,
  append,
  handleSubmit,
}: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: "List all diseases",
      label: "List all the diseases detected so far in the farm",
      action:
        "List all the diseases detected so far in the farm. Provide insights about the diseases and the severity of the diseases. Provide reccomendations for the diseases.",
    },
    {
      title: "Analyze plant health",
      label: "Review recent plant health data",
      action:
        "Analyze the latest plant health data and provide insights about plant health conditions and health metrics.",
    },
    {
      title: "Search for the latest diseases detected",
      label: "Search for the latest diseases detected",
      action:
        "Search for the latest diseases detected and provide insights about the diseases and the severity of the diseases.",
    },
    {
      title: "Visualize and plot the diseases detected",
      label: "Visualize and plot the diseases detected",
      action:
        "Visualize and plot the diseases detected and provide insights about the diseases and the severity of the diseases.",
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full pb-2">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 20,
          }}
          transition={{
            delay: 0.05 * index,
          }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? "hidden sm:block" : "block"}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              const userMessage: Message = {
                id: crypto.randomUUID(),
                role: 'user',
                content: suggestedAction.action,
              };
              await saveMessages([userMessage], chatId);
              await append(userMessage);
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm gap-1 sm:flex-col w-full h-auto justify-start items-start sm:items-stretch"
          >
            <span className="font-medium truncate">{suggestedAction.title}</span>
            <span className="text-muted-foreground truncate">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
export const SuggestedActions = memo(PureSuggestedActions, () => true);
