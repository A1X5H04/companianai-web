import React from "react";
import SearchInput from "./_components/search-input";
import Categories from "./_components/categories";
import prismadb from "@/lib/prismadb";
import Companions from "./_components/companions";

interface MainPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

async function MainPage({ searchParams }: MainPageProps) {
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        contains: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div>
      <div className="mt-3 space-y-3">
        <SearchInput />
        <Categories data={categories} />
        <Companions data={data} />
      </div>
    </div>
  );
}

export default MainPage;
