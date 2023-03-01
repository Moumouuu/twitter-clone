export default async function handler(req, res) {
    const userId = req.query.id;
    if (req.method === 'GET') {
        try {
            const tweets = await prisma.tweet.findMany({
                where: {
                    authorId: Number(userId)
                }
            })
            res.status(200).json({tweets, message: "tweets found"})
        } catch (e) {
            console.log(e)
        }
    } else {
        res.status(405).json({message: 'Method not allowed'})
    }
}