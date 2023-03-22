export default async function handler(req, res) {
    //get data from the body of the request
    const content = req.body.content;
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    //create new message
    if (req.method === 'POST') {
        const response = await prisma.message.create({
            data: {
                content: content,
                senderId: senderId,
                receiverId: Number(receiverId),
            }
        });
        res.status(201).json(response);
    } else {
        res.status(500).json({message: "method not allowed"})
    }
}