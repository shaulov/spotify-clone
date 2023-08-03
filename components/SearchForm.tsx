'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import Input from "./Input";

function SearchForm() {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    }
    const url = qs.stringifyUrl({
      url: '/search',
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <form className="mb-2" action="#" method="get">
      <label className="sr-only" htmlFor="search">Enter song title</label>
      <Input 
        id="search"
        type="search"
        placeholder="What do you want to listen to?"
        onChange={(evt) => setValue(evt.target.value)}
      />
    </form>
  );
}

export default SearchForm;