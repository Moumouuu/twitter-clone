export default async function handler(req, res) {
    const {search} = req.body;
    if (req.method === "POST") {
        try {
            const users = await prisma.user.findMany({
                where: {
                    name: {
                        contains: search,
                    }
                }
            });
            res.status(200).json({users, message: 'success'});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Internal server error"});
        }
    } else {
        res.status(400).json({message: "Method not allowed"});
    }
}