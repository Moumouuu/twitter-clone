export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const idFollower = req.body.idFollower;
        const idFollowed = req.body.idFollowed;
        try {
            await prisma.follow.deleteMany({
                where: {
                    AND: [
                        {followerId: idFollower},
                        {followedId: idFollowed}
                    ]
                }
            })
            res.status(200).json({message: "Follow removed"});
        } catch (e) {
            console.log(e)
        }
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}