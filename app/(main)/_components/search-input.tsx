"use client";

import { Input } from "@nextui-org/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

import useDebounce from "@/hooks/use-debounce";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");
  const debouncedValue = useDebounce(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      categoryId: categoryId,
      name: debouncedValue,
    };

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query: query,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, categoryId, router]);

  return (
    <div>
      <Input
        label="Search"
        onChange={handleChange}
        value={value}
        placeholder="Search Companions"
      />
    </div>
  );
}

export default SearchInput;
