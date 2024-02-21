"use client";

interface ChatLayoutProps {
  children: React.ReactNode;
}

function ChatLayout({ children }: ChatLayoutProps) {
  return <div className="max-w-4xl mx-auto h-full w-full">{children}</div>;
}

export default ChatLayout;
