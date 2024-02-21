import { useUser } from "@clerk/nextjs";
import { Avatar } from "@nextui-org/avatar";
import { Role } from "@prisma/client";
import React from "react";
import { twMerge } from "tailwind-merge";
import TextEffect from "gpt-type-effect";

export interface ChatMessageProps {
  role: Role;
  content?: string;

  isLastMessage?: boolean;
  avatar?: string;
}

function ChatMessage({
  role,
  content,
  avatar,
  isLastMessage,
}: ChatMessageProps) {
  const { user } = useUser();
  return (
    <div
      className={twMerge(
        "group flex items-start gap-x-3 py-2",
        role === Role.SYSTEM ? "justify-start" : "justify-end"
      )}
    >
      {role === Role.SYSTEM && <Avatar src={avatar} alt="Avatar" size="sm" />}
      <div
        className={twMerge(
          "p-unit-sm rounded-large max-w-unit-8xl",
          role === Role.SYSTEM
            ? "bg-content2 text-content2-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {role === Role.SYSTEM && isLastMessage ? (
          <TextEffect
            text={content || "Seems like I got my self confused!"}
            textClassName="text-small leading-snug"
            notDisplayCaretAfterFinishes
            caretBackground="text-content2-foreground"
          />
        ) : (
          <p className="text-small">{content}</p>
        )}
      </div>
      {role === Role.USER && (
        <Avatar src={user?.imageUrl} alt="Avatar" size="sm" />
      )}
    </div>
  );
}

export default ChatMessage;
