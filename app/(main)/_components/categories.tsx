"use client";

import qs from "query-string";
import { Category } from "@prisma/client";
import React from "react";
import { Button } from "@nextui-org/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Categories {
  data: Category[];
}

function Categories({ data }: Categories) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const handleClick = (id: string | undefined) => {
    const query = {
      categoryId: id,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="flex items-center overflow-x-auto gap-x-2 p-1">
      <Button
        onClick={() => handleClick(undefined)}
        variant={categoryId ? "flat" : "bordered"}
        color={!categoryId ? "primary" : "default"}
      >
        All
      </Button>
      {data.map((category) => (
        <Button
          key={category.id}
          onClick={() => handleClick(category.id)}
          variant={category.id === categoryId ? "bordered" : "flat"}
          color={category.id === categoryId ? "primary" : "default"}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

export default Categories;
