import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

const SearchPost = () => {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="search" placeholder="Seach" className="w-[280px]" />
      <Button type="submit" className="p-3">
        <FaSearch />
      </Button>
    </div>
  );
};

export default SearchPost;
