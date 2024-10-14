import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

const SearchPost = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const router = useRouter();

  const onSubmit = useCallback(
    (data: { search: string }) => {
      router.push(`/search?query=${data.search}`);
    },
    [router]
  );

  return (
    <form
      className="flex  max-w-sm items-center gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="search"
        placeholder="Seach"
        className="w-[280px]"
        {...register("search", {
          required: "검색어를 입력해주세요",
        })}
      />
      <Button type="submit" className="p-3">
        <FaSearch />
      </Button>
    </form>
  );
};

export default SearchPost;
