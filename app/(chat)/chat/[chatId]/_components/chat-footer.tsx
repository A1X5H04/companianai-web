import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { ChatRequestOptions } from "ai";
import React from "react";

interface ChatFooterProps {
  isLoading: boolean;
  input: string;
  handleInputChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (
    evt: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}

function ChatFooter({
  isLoading,
  input,
  handleInputChange,
  onSubmit,
}: ChatFooterProps) {
  return (
    <form className="flex items-center gap-x-2 py-4" onSubmit={onSubmit}>
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        autoComplete="off"
        placeholder="Ask your companion..."
      />
      <Button
        disabled={isLoading}
        type="submit"
        color="primary"
        size="lg"
        isIconOnly
      >
        <PaperPlaneRight weight="fill" size={24} />
      </Button>
    </form>
  );
}

export default ChatFooter;
