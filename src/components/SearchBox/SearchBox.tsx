import css from "./SearchBox.module.css";

export type SearchBoxProps = {
  defaultValue?: string;
  onSearch: (newSearchQuery: string) => void;
};

export default function SearchBox({
  defaultValue = "",
  onSearch,
}: SearchBoxProps) {
  return (
    <input
      type="text"
      className={css.input}
      defaultValue={defaultValue}
      placeholder="Search notes"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
