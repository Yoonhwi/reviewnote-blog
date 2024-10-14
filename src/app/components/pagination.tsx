import {
  Pagination as _Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPage) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const cutPageNumber = 5; // 보여줄 페이지 수
    const startPage =
      Math.floor((currentPage - 1) / cutPageNumber) * cutPageNumber + 1;

    for (
      let i = startPage;
      i < startPage + cutPageNumber && i <= totalPage;
      i++
    ) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <_Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={currentPage === page ? "font-bold" : ""}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPage}
            className={
              currentPage === totalPage ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </_Pagination>
  );
};

export default Pagination;
