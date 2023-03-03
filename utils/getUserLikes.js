import getTweetFromId from "@/utils/getTweetFromId";

export default async function getUserLikes(router, tweets, setTweets, userConnectedId) {
    try {
        const response = await fetch('/api/tweetsLiked/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: userConnectedId}),
        })
        const data = await response.json();
        data.tweetsLiked.forEach((tweet) => {
            getTweetFromId(tweet.tweetId, router, tweets, setTweets);
        });
    } catch (e) {
        console.log(e)
    }
}
