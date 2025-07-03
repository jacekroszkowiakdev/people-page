export interface TeamLink {
    userId: string;
    teamId: string;
    assignedAt: string;
    team: {
        id: string;
        name: string;
    };
}

export interface Membership {
    role: string;
    isGuest: boolean;
}

export interface Member {
    id: string;
    email: string;
    name: string | null;
    lastLoginAt: string | null;
    createdAt: string;
    updatedAt: string | null;

    memberships: Membership[];
    teamLinks: TeamLink[];
}

export interface MembersResponse {
    members: Member[];
}

export type SortField = "role" | "guest" | "lastLogin" | "team";
