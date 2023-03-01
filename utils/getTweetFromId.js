export default async function getTweetFromId(id, router, tweets, setTweets) {
    try {
        const response = await fetch(`/api/getTweet/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        setTweets((tweets) => [...tweets, data.tweet]);
    } catch (e) {
        console.log(e)
    }
}