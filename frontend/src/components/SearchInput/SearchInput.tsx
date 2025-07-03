import "./SearchInput.css";

interface FilterProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchInput: React.FC<FilterProps> = ({
    value,
    onChange,
    placeholder,
}) => {
    return (
        <div className="filter-input">
            <button className="filter-button">Filters</button>
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
