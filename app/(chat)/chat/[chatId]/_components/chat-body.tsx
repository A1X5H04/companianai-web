import { useEffect, useRef } from "react";
import { Companion, Role } from "@prisma/client";
import ChatMessage from "./chat-message";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Avatar } from "@nextui-org/avatar";

interface ChatBodyProps {
  messages: any[];
  isLoading: boolean;
  companion: Companion;
}

function ChatBody({ messages, isLoading, companion }: ChatBodyProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <ScrollShadow className="flex-1 h-full" hideScrollBar>
      <ChatMessage
        avatar={companion.imageSrc}
        role={Role.SYSTEM}
        content={"Hello, I'm a " + companion.name + ". What's on your mind?"}
      />

      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          content={message.content}
          avatar={companion.imageSrc}
          isLastMessage={index === messages.length - 1}
        />
      ))}
      {isLoading && (
        <div className="group flex items-start gap-x-3 py-1 justify-start">
          <Avatar src={companion.imageSrc} alt="Avatar" size="sm" />
          <div className="px-unit-sm rounded-large max-w-unit-8xl bg-content2 text-content2-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={48}
              height={48}
              viewBox="0 0 24 24"
            >
              <circle cx={18} cy={12} r={0} fill="currentColor">
                <animate
                  attributeName="r"
                  begin={0.67}
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                ></animate>
              </circle>
              <circle cx={12} cy={12} r={0} fill="currentColor">
                <animate
                  attributeName="r"
                  begin={0.33}
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                ></animate>
              </circle>
              <circle cx={6} cy={12} r={0} fill="currentColor">
                <animate
                  attributeName="r"
                  begin={0}
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                ></animate>
              </circle>
            </svg>
          </div>
        </div>
      )}
      <div ref={scrollRef} />
    </ScrollShadow>
  );
}

export default ChatBody;
