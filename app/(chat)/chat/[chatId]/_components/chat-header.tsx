"use client";

import CompanianInfoModal from "@/components/companion-info-modal";
import { useUser } from "@clerk/nextjs";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { CaretLeft, Info, PencilSimple, Trash } from "@phosphor-icons/react";
import { Companion, Message } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export function ChatHeader({ companion }: ChatHeaderProps) {
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onDelete = () => {
    axios
      .delete(`/api/companion/${companion.id}`)
      .then(() => {
        toast.success("Companion deleted successfully");
        router.push("/");
      })
      .catch((error) => {
        toast.error("Failed to delete companion");
      });
  };

  return (
    <div className="flex justify-between items-center py-2">
      <div className="inline-flex items-center gap-x-3">
        <CaretLeft
          size={24}
          onClick={() => router.back()}
          className="mr-2 cursor-pointer"
        />
        <Avatar src={companion.imageSrc} alt={companion.name} />
        <div>
          <div className="inline-flex items-start gap-x-1">
            <h1 className="text-large font-bold capitalize leading-snug">
              {companion.name}
            </h1>
            <span className="text-tiny font-light">
              {companion._count.messages}
            </span>
          </div>
          <p className="text-default-500 text-small ">
            Created by {companion.userName}
          </p>
        </div>
      </div>

      <div className="inline-flex gap-x-3">
        <Button isIconOnly onClick={onOpen}>
          <Info size={24} />
        </Button>
        {user?.id === companion.userId && (
          <>
            <Button
              isIconOnly
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <PencilSimple size={24} />
            </Button>

            <Button isIconOnly color="danger" onClick={onDelete}>
              <Trash size={24} />
            </Button>
          </>
        )}
      </div>

      <CompanianInfoModal
        companion={companion}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}

export default ChatHeader;
