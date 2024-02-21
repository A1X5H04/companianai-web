"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chat, ChatCenteredDots } from "@phosphor-icons/react";
import { Companion } from "@prisma/client";
import Link from "next/link";
import NextImage from "next/image";

interface CompanionsProps {
  data: (Companion & { _count: { messages: number } })[];
}

function Companions({ data }: CompanionsProps) {
  if (data.length === 0) return <div>No companions found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      {data.map((companion) => (
        <Card key={companion.id}>
          <CardHeader>
            <div className="grid place-items-center">
              <Image
                as={NextImage}
                src={companion.imageSrc}
                alt={companion.name}
                width={320}
                height={320}
                className="object-cover aspect-square"
              />
            </div>
          </CardHeader>

          <CardBody>
            <div className="flex justify-between items-center px-2">
              <div>
                <h4 className="font-bold text-large capitalize">
                  {companion.name}
                </h4>
                <p className="text-default-500 text-tiny lowercase">
                  @{companion.userName}
                </p>
              </div>
              <div>
                <p className="text-default-500 text-small">
                  {companion._count.messages}
                </p>
              </div>
            </div>
            <div className="my-4 px-2">
              <p className="text-default-500 text-small">
                {companion.description}
              </p>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              as={Link}
              href={`/chat/${companion.id}`}
              startContent={<ChatCenteredDots size={20} weight="fill" />}
              color="primary"
              className="w-full font-bold"
            >
              Chat with {companion.name}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Companions;
