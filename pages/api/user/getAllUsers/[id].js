import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const userId = req.query.id;

    if (req.method === 'GET') {
        //récupère une liste de message envoyé et reçu par l'utilisateur connecté
        console.log(userId)
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: Number(userId),
                    },
                    {
                        receiverId: Number(userId),
                    }
                ]
            },
            distinct: ['senderId'],
        });
        //parcourir chaque message et récupérer l'utilisateur qui l'a envoyé
        let users = [];
        for (let i = 0; i < messages.length; i++) {
            const user = await prisma.user.findUnique({
                where: {
                    id: messages[i].senderId,
                },
            });
            users.push(user);
        }
        res.status(200).json(users);
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}