import "./TeamTable.css";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import type { Member } from "../../types/types";
import type { MembersResponse } from "../../types/types";

import FilterInput from "../SearchInput/SearchInput";

const TeamTable = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [error, setError] = useState<string | null>(null);

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

            console.log("API members response:", response.data);
            setMembers(response.data.members);
        } catch (error: unknown) {
            console.error(" Error fetching members:", error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.error || error.message);
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }, [])




    useEffect(() => {
        fetchMembers("");
    }, []);

    // filter with delay to avoid too many API calls
    useEffect(() => {
        if (filter === "") {
            fetchMembers("");
            return;
        }

        const timeout = setTimeout(() => {
            fetchMembers(filter);
        });

        return () => clearTimeout(timeout);
    }, [filter, fetchMembers]);

    const formatDate = (date: string | null) =>
        date ? new Date(date).toLocaleDateString() : "Never";

    if (isLoading) return <p className="members-container">Loading...</p>;
    if (error) return <p className="members-container">Error: {error}</p>;

    return (
        <div className="members-container">
            <h5 className="members-heading">
                {members.length} people in the Redocly organization
            </h5>
            <FilterInput
                value={filter}
                onChange={setFilter}
                placeholder="Filter by name or email"
            />
            <table className="members-table">
                <thead>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Last Login</th>
                    <th>Teams</th>
                    <th>Actions </th>
                </thead>
                <tbody>
                    {members.map((member) => {
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
                                <td>
                                    <button
                                        className="action-btn"
                                        onClick={() =>
                                            alert(
                                                `View ${
                                                    member.name || member.email
                                                }`
                                            )
                                        }
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TeamTable;
