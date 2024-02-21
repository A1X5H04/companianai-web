"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { Image } from "@nextui-org/image";
import { SketchLogo } from "@phosphor-icons/react";

interface ProSubscriptionModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function ProSubscriptionModal({
  isOpen,
  onOpenChange,
}: ProSubscriptionModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("An error occurred while subscribing to Pro.");
    } finally {
      setIsLoading(false);
    }
  };

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
            <ModalHeader className="flex flex-col gap-1">
              Pro Subscription
            </ModalHeader>
            <ModalBody>
              <div className="relative">
                <Image
                  src="/mesh-340.png"
                  isBlurred
                  alt="Pro Subscription"
                  width="100%"
                />
                <div className="absolute inset-0  z-20 rounded-large grid place-items-end">
                  <div className="flex flex-col p-4">
                    <SketchLogo size={50} color="black" className="mb-2" />
                    <h2 className="text-2xl font-black text-white mb-2 uppercase">
                      Unlock Pro!
                    </h2>
                    <p className="text-small leading-snug font-medium text-gray-900">
                      Subscribe to Pro to add your own custom companions and
                      support the development of this project.
                    </p>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                className="font-bold"
                isLoading={isLoading}
                onClick={onSubscribe}
              >
                Subscribe to Pro
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ProSubscriptionModal;
