"use client";

import { useCompletion } from "ai/react";
import { Companion, Message, Role } from "@prisma/client";
import { FormEvent, useState } from "react";
import ChatHeader from "./chat-header";
import { Divider } from "@nextui-org/divider";
import { useRouter } from "next/navigation";
import ChatFooter from "./chat-footer";
import ChatBody from "./chat-body";

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

function ChatClient({ companion }: ChatClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>(companion.messages);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(_, completion) {
        const systemMessage = {
          role: Role.SYSTEM,
          content: completion,
        };
        setMessages((prev) => [...prev, systemMessage]);
        setInput("");
        router.refresh();
      },
      onError(err: any) {
        setError({
          status: true,
          message: err.message,
        });
        console.error(err);
      },
    });

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    const userMessage = {
      role: Role.USER,
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    handleSubmit(evt);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
      <Divider />
      <ChatBody
        isLoading={isLoading}
        companion={companion}
        messages={messages}
      />
      <Divider />
      <div className="text-center text-default-500 text-small">
        {error.status && error.message}
      </div>
      <ChatFooter
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default ChatClient;
