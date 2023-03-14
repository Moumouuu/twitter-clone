import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}