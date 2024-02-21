import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Companion, Message } from "@prisma/client";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";

interface CompanianInfoModalProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function CompanianInfoModal({
  companion,
  isOpen,
  onOpenChange,
}: CompanianInfoModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={{
        initial: { opacity: 0, scale: 0.95 },
        variants: {
          enter: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.3, ease: "easeInOut" },
          },
          exit: {
            scale: 1.05,
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Companion Info</ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center gap-y-3">
                <Image
                  as={NextImage}
                  src={companion.imageSrc}
                  alt={companion.name}
                  width={125}
                  height={125}
                  className="rounded-full object-cover aspect-square"
                />
                <div className="text-center">
                  <h1 className="text-large font-bold capitalize">
                    {companion.name}
                  </h1>
                  <p className="text-default-500 text-small">
                    @{companion.userName}
                  </p>
                </div>
                <p className="text-default-500 text-small">
                  {`Messages: ${companion._count.messages}`}
                </p>
              </div>
              <div className="my-4 text-center">
                <p className="text-default-500 text-small">
                  {companion.description}
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className="font-bold" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CompanianInfoModal;
