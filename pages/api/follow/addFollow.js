export default async function handler(req, res) {
    const idFollower = req.body.idFollower;
    const idFollowed = req.body.idFollowed;
    if (req.method === 'POST') {
        try {
            await prisma.follow.create({
                data: {
                    followerId: idFollower,
                    followedId: idFollowed,
                }
            });
            res.status(200).json({message: "Follow added"});
        } catch (e) {
            console.log(e);
        }
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}