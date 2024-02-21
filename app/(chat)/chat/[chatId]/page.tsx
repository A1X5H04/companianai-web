import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

import prismadb from "@/lib/prismadb";
import ChatClient from "./_components/chat-client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

async function ChatIdPage({ params }: ChatIdPageProps) {
  const { userId } = auth();

  if (!userId) return redirectToSignIn();

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) return redirect("/");

  return <ChatClient companion={companion} />;
}

export default ChatIdPage;
