export default async function handler(req, res) {
    const {id} = req.query;
    const userId = req.body.userId;
    if (req.method === 'POST') {
        try {
            const alreadyLiked = await prisma.like.findMany({
                where: {
                    tweetId: Number(id),
                    userId: Number(userId)
                }
            });
            res.status(200).json({alreadyLiked, message: 'Already liked'});
        } catch (e) {
            console.log(e);
        }
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}