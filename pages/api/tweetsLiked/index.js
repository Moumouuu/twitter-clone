export default async function handler(req, res) {
    const userId = req.body.userId;
    if (req.method === 'POST') {
        try {
            const tweetsLiked = await prisma.like.findMany({
                where: {
                    userId: userId
                }
            });
            res.status(201).json({tweetsLiked, message: 'tweetsLiked fetched successfully'});
        } catch (e) {
            console.log(e)
        }
    } else {
        res.status(400).json({message: 'Method not allowed'});
    }
}