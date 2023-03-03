export default async function handler(req, res) {
    const {id} = req.query;
    if (req.method === 'GET') {
        const numberOfComments = await prisma.response.count({
            where: {
                tweetId: parseInt(id)
            }
        });
        res.status(200).json({numberOfComments});
    } else {
        res.status(405).json({message: 'Method not allowed'});
    }

}