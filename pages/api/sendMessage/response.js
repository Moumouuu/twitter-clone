export default async function handler(req, res) {
    const tweetId = req.body.tweetId;
    const userConnected = req.body.user;
    const message = req.body.message;

    if (req.method === 'POST') {
        let user = null
        //find user with email in db
        if (userConnected) {
            user = await prisma.user.findUnique({
                where: {
                    email: userConnected.email
                }
            })
        }
        const image = req.body.image;
        await prisma.response.create({
            data: {
                content: message,
                tweetId: Number(tweetId),
                authorId: Number(user.id),
                image: image
            }
        })
        res.status(200).json({message: "response posted"})
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}