export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const followings = await prisma.follow.count({
                where: {
                    followedId: Number(req.query.id)
                }
            });
            res.status(200).json({followings, message: "followers found"});
        } catch (e) {
            console.log(e);
        }
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}