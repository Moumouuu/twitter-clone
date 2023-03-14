import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const userId = req.query.userId;

    if (req.method === 'GET') {
        //récupère une liste de message envoyé par l'utilisateur connecté
        // TODO : récupérer les messages reçu par l'utilisateur connecté
        const messages = await prisma.message.findMany({
            where: {
                senderId: 2,
            },
        });
        //parcourir chaque message et récupérer l'utilisateur qui l'a envoyé
        // todo : bug ??
        let users = [];
        messages.forEach(message => {
            const user = prisma.user.findUnique({
                where: {
                    id: message.senderId,
                }
            });
            users.push(user);
        })
        res.status(200).json(users);
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}