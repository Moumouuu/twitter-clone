import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    const tweetId = req.query.id;
    const authorId = req.body.idPerson;
    const alreadyLiked = req.body.alreadyLiked;

    //if like already exists
    if (req.method === 'POST' && alreadyLiked) {
        try {
            await prisma.like.deleteMany({
                where: {
                    tweetId: Number(tweetId),
                    userId: Number(authorId),
                }
            })
            res.status(200).json({message: 'Like deleted'});
        } catch (e) {
            console.log(e);
        }
    }
    // if not like for tweetId and authorId
    else if (req.method === 'POST' && !alreadyLiked) {
        try {
            await prisma.like.create({
                data: {
                    tweetId: Number(tweetId),
                    userId: Number(authorId),
                }
            })
            res.status(200).json({message: 'Like added'});
        } catch (e) {
            console.log(e);
        }
    } else {
        res.status(500).json({message: 'Method not allowed'});
    }
}