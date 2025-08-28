import ReactPaginate from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const props: ReactPaginateProps = {
    pageCount: totalPages,
    forcePage: page,
    marginPagesDisplayed: 1,
    pageRangeDisplayed: 5,
    onPageChange: (e) => onPageChange(e.selected),
    containerClassName: css.pagination,
    activeClassName: css.active,
    previousLabel: "←",
    nextLabel: "→",
  };
  return <ReactPaginate {...props} />;
}
