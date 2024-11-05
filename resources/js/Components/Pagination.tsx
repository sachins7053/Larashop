import React from 'react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
  } from "@/components/ui/pagination"

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Paginations: React.FC<PaginationProps> = ({ totalItems, itemsPerPage,  currentPage, onPageChange }) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination flex gap-2">
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious  onClick={() => handleClick(currentPage - 1)} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => ( 
                    <PaginationItem key={page}>
                        <PaginationLink onClick={() => handleClick(page)}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext onClick={() => handleClick(currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
      
    </div>
  );
};

export default Paginations;
