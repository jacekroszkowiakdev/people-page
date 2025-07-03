import "./SortControls.css";
import type { SortField } from "../../types/types";

interface SortControlsProps {
    current: SortField | null;
    onSort: (field: SortField) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ current, onSort }) => {
    return (
        <div className="sort-controls">
            <button
                className={current === "role" ? "active" : ""}
                onClick={() => onSort("role")}
            >
                Sort by Role
            </button>
            <button
                className={current === "guest" ? "active" : ""}
                onClick={() => onSort("guest")}
            >
                Sort by Guest
            </button>
            <button
                className={current === "lastLogin" ? "active" : ""}
                onClick={() => onSort("lastLogin")}
            >
                Sort by Last Login
            </button>
            <button
                className={current === "team" ? "active" : ""}
                onClick={() => onSort("team")}
            >
                Sort by Team
            </button>
        </div>
    );
};

export default SortControls;
