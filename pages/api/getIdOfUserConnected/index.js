import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const email = req.body.email;
    if (req.method === 'POST') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
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