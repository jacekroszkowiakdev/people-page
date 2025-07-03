import "./TeamTable.css";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Member } from "../../types/types";
import type { MembersResponse } from "../../types/types";

const TeamTable = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get<MembersResponse>("/api/members")
            .then((response) => {
                console.log("✅ /api/members response:", response.data);
                setMembers(response.data.members);
            })
            .catch((error) => {
                console.error("Error fetching members:", error);
                setError(error.response?.data?.error || error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const formatDate = (date: string | null) =>
        date ? new Date(date).toLocaleDateString() : "Never";

    if (isLoading) return <p className="members-container">Loading...</p>;
    if (error) return <p className="members-container">Error: {error}</p>;

    return (
        <div className="members-container">
            <h1 className="members-heading">
                NUM people in the Redocly organization
            </h1>
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
                                <td>{m?.role || "VIEWER"}</td>
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
