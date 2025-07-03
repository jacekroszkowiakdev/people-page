import "./TeamTable.css";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import type { Member } from "../../types/types";
import type { MembersResponse } from "../../types/types";

import SearchInput from "../SearchInput/SearchInput";
import SortControls from "../SortControls/SortControls";

const TeamTable = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [sortField, setSortField] = useState<
        "role" | "guest" | "lastLogin" | "team" | null
    >(null);

    const fetchMembers = useCallback(async (filterInput: string) => {
        try {
            setLoading(true);
            setError(null);

            const params = filterInput.trim()
                ? { search: filterInput.trim() }
                : {};

            const response = await axios.get<MembersResponse>("/api/members", {
                params,
            });

            setMembers(response.data.members);
        } catch (error: unknown) {
            console.error("Error fetching members:", error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.error || error.message);
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const handleFilter = () => {
        fetchMembers(filter);
    };

    useEffect(() => {
        fetchMembers("");
    }, []);

    const formatDate = (date: string | null) =>
        date ? new Date(date).toLocaleDateString() : "Never";

    const sortedMembers = [...members];

    if (sortField) {
        sortedMembers.sort((a, b) => {
            switch (sortField) {
                case "role":
                    return (a.memberships[0]?.role || "").localeCompare(
                        b.memberships[0]?.role || ""
                    );
                case "guest": {
                    const isGuestA = a.memberships[0]?.role === "guest" ? 1 : 0;
                    const isGuestB = b.memberships[0]?.role === "guest" ? 1 : 0;
                    return isGuestA - isGuestB;
                }
                case "lastLogin": {
                    const timeA = a.lastLoginAt
                        ? new Date(a.lastLoginAt).getTime()
                        : 0;
                    const timeB = b.lastLoginAt
                        ? new Date(b.lastLoginAt).getTime()
                        : 0;
                    return timeA - timeB;
                }
                case "team": {
                    const teamA = a.teamLinks[0]?.team.name || "";
                    const teamB = b.teamLinks[0]?.team.name || "";
                    return teamA.localeCompare(teamB);
                }
                default:
                    return 0;
            }
        });
    }

    if (isLoading) return <p className="members-container">Loading...</p>;
    if (error) return <p className="members-container">Error: {error}</p>;

    return (
        <div className="members-container">
            <div className="sort-container">
                <SortControls current={sortField} onSort={setSortField} />
            </div>
            <h5 className="members-heading">
                {members.length} people in the Redocly organization
            </h5>
            <div className="filter-controls">
                <SearchInput
                    value={filter}
                    onChange={setFilter}
                    onFilterClick={handleFilter}
                    placeholder="Filter by name or email"
                />
            </div>
            <table className="members-table">
                <thead>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Last Login</th>
                    <th>Teams</th>
                    <th>Actions </th>
                </thead>
                <tbody>
                    {sortedMembers.map((member) => {
                        const m = member.memberships[0];

                        return (
                            <tr key={member.id}>
                                <td>{member.name || "N/A"}</td>
                                <td>{m?.role}</td>
                                <td>{formatDate(member.lastLoginAt)}</td>
                                <td>
                                    {member.teamLinks.length === 0 ? (
                                        <span style={{ color: "#888" }}>
                                            No teams
                                        </span>
                                    ) : (
                                        member.teamLinks
                                            .sort((a, b) =>
                                                a.team.name.localeCompare(
                                                    b.team.name
                                                )
                                            )
                                            .map((t) => (
                                                <span key={t.teamId}>
                                                    {t.team.name}{" "}
                                                </span>
                                            ))
                                    )}
                                </td>
                                <td></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TeamTable;
