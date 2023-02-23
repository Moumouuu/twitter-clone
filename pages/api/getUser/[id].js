import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const {id} = req.query;
    console.log(id);
    if (req.method === 'GET') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(id)
                }
            });
            res.status(200).json({user, message: "User found"});
        } catch (e) {
            console.log(e);
        }
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}