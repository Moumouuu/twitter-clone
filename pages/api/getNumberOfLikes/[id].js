import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const idTweet = req.query.id;
    if (req.method === 'GET') {
        try {
            const numberOfLikes = await prisma.like.findMany({
                where: {
                    tweetId: Number(idTweet)
                }
            });
            res.status(200).json({numberOfLikes, message: "Likes found"});
        } catch (e) {
            console.log(e);
        }
    } else {
        res.status(500).json({message: 'Method not allowed'});
    }
}