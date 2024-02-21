import qs from "query-string";
import { Category } from "@prisma/client";
import React from "react";
import { Button } from "@nextui-org/button";

interface Categories {
  data: Category[];
}

function Categories({ data }: Categories) {
  return (
    <div className="flex items-center overflow-x-auto gap-x-2 p-1">
      <Button variant="flat">All</Button>
      {data.map((category) => (
        <Button key={category.id} variant="bordered">
          {category.name}
        </Button>
      ))}
    </div>
  );
}

export default Categories;
