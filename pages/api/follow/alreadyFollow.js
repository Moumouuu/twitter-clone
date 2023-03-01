export default async function handler(req, res) {
    const idFollower = req.body.idFollower;
    const idFollowed = req.body.idFollowed;
    if (req.method === 'POST') {
        try {
            const alreadyFollow = await prisma.follow.findMany(
                {
                    where: {
                        AND: [
                            {followerId: idFollower},
                            {followedId: idFollowed}
                        ]
                    }
                })
            res.status(200).json({alreadyFollow, message: "Follow found"});
        } catch (e) {
            console.log(e)
        }
    } else {
        res.status(500).json({message: "Method not allowed"});
    }
}