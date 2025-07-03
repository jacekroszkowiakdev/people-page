import { Request, Response, Router } from "express";
import { PrismaClient } from "../generated/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const members = await prisma.user.findMany({
            where: {
                memberships: {
                    some: {
                        role: "MEMBER",
                    },
                },
            },
            include: {
                memberships: {
                    select: {
                        role: true,
                        isGuest: true,
                    },
                },
                teamLinks: {
                    include: {
                        team: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
        });
        res.json({ members });
    } catch (err) {
        console.error("Failed to fetch members", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
