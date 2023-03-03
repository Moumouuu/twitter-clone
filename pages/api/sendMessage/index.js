export {prisma} from '@/lib/prisma'
export default async function handler(req, res) {
    const userConnected = req.body.user;
    let user = null

    //find user with email in db
    if (userConnected) {
        user = await prisma.user.findUnique({
            where: {
                email: userConnected.email
            }
        })
    }
    //if user is not found, create new user with session data
    if (user === null) {
        try {
            user = await prisma.user.create({
                data: {
                    email: userConnected.email,
                    name: userConnected.name,
                    picture: userConnected.image,
                }
            })
        } catch (e) {
            res.status(500).json({message: "User not created"})
            console.log(e);
        }
    }
    if (req.method === 'POST' && user) {
        const message = req.body.message;
        try {
            await prisma.tweet.create({
                data: {
                    content: message,
                    authorId: user.id,
                }
            })
            res.status(200).json({message: "Tweet posted"})
        } catch (e) {
            res.status(500).json({message: "Tweet not posted"})
            console.log(e);
        }
    } else {
        res.status(500).json({message: "Method not allowed"})
    }
}