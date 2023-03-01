export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const followers = await prisma.follow.count({
                where: {
                    followerId: Number(req.query.id)
                }
            });
            res.status(200).json({followers, message: "followers found"});
        } catch (e) {
            console.log(e);
        }
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}