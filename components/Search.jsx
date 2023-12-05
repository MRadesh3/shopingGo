"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Search = (req, { params }) => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword) {
      const encodedKeyword = encodeURI(keyword);
      router.push(`/products/${encodedKeyword}`);
    }
  };

  return (
    <section className="absolute mt-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <form className="flex items-center gap-1" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          name="keyword"
          id="keyword"
          placeholder="Search a product.."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border-2 border-[#fe7f07] px-3 py-2 rounded-lg "
        />
        <input
          type="submit"
          name="submit"
          id="submit"
          value="Search"
          className="bg-[#fe7f07] text-white px-3 py-2 rounded-lg font-semibold hover:bg-[#4b077c]"
        />
      </form>
    </section>
  );
};

export default Search;
