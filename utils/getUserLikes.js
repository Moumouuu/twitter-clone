import getTweetFromId from "@/utils/getTweetFromId";

export default async function getUserLikes(router, tweets, setTweets, userConnectedId) {
    try {
        const response = await fetch('/api/tweetsLiked/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: userConnectedId}),
        }).then(
            (response) => response.json().then(
                (data) => {
                    //Permet de récupérer les tweets en fonction de l'id des tweets likés
                    data.tweetsLiked.forEach((tweet) => {
                        getTweetFromId(tweet.tweetId, router, tweets, setTweets)
                    });
                }
            ));
    } catch (e) {
        console.log(e)
    }
}
