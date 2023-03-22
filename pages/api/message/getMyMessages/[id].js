export default async function handler(req, res) {
    const idUserConnected = req.body.userConnectedId;
    const idUserToChat = req.query.id;
    console.log(idUserConnected, idUserToChat);
    if (req.method === "POST") {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        //my messages sended to the other user
                        AND: [
                            {
                                senderId: idUserConnected,
                            },
                            {
                                receiverId: Number(idUserToChat),
                            },
                        ],
                    },
                    {
                        // message send from the other user to me
                        AND: [
                            {
                                senderId: Number(idUserToChat),
                            },
                            {
                                receiverId: idUserConnected,
                            },
                        ],
                    },
                ],
            },
        });
        res.status(200).json(messages);
    } else {
        res.status(500).json({error: "Method not allowed"})
    }
}