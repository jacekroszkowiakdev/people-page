import "./SearchInput.css";

interface FilterProps {
    value: string;
    onChange: (value: string) => void;
    onFilterClick: () => void;
    placeholder?: string;
}

const SearchInput: React.FC<FilterProps> = ({
    value,
    onChange,
    onFilterClick,
    placeholder,
}) => {
    return (
        <div className="filter-input">
            <button className="filter-button" onClick={onFilterClick}>
                Filters
            </button>
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || "Search..."}
            />
        </div>
    );
};

export default SearchInput;
