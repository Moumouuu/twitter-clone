export default async function handler(req, res) {
    const tweetId = req.query.id;
    if (req.method === 'GET') {
        try {
            const tweet = await prisma.tweet.findUnique({
                where: {
                    id: Number(tweetId)
                }
            });
            res.status(201).json({tweet, message: 'tweet fetched successfully'});
        } catch (e) {
            console.log(e)
        }
    } else {
        res.status(400).json({message: 'Method not allowed'});
    }
}