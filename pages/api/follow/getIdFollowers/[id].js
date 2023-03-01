export default async function handler(req, res) {
    const userId = req.query.id;
    if (req.method === 'GET') {
        try {
            const followers = await prisma.follow.findMany({
                where: {
                    followerId: Number(userId)
                }
            })
            res.status(200).json({followers, message: "followers found"})
        } catch (e) {
            console.log(e)
        }
    } else {
        res.status(405).json({message: 'Method not allowed'})
    }
}