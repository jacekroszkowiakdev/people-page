import "./SearchInput.css";

interface FilterProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const FilterInput: React.FC<FilterProps> = ({
    value,
    onChange,
    placeholder,
}) => {
    return (
        <div className="search-input">
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || "Search..."}
            />
        </div>
    );
};

export default FilterInput;
