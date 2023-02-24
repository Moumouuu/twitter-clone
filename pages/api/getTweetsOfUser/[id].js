export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const tweets = await prisma.tweet.count({
                where: {
                    authorId: Number(req.query.id)
                }
            });
            res.status(200).json({tweets, message: "Tweets found"});
        } catch (e) {
            console.log(e);
        }
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}