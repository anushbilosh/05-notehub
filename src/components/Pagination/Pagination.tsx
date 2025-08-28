import ReactPaginate from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  pageCount: number;
  forcePage?: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({
  pageCount,
  forcePage,
  onPageChange,
}: PaginationProps) {
  const props: ReactPaginateProps = {
    pageCount,
    forcePage,
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
