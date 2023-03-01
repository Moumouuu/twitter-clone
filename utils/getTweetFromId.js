import refreshPage from "@/utils/refreshPage";

export default async function getTweetFromId(id, router, tweets) {
    try {
        const response = await fetch(`/api/getTweet/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            (response) => {
                return response.json().then(
                    (data) => {
                        tweets.push(data.tweet);
                        refreshPage(router)
                    }
                );
            });
    } catch (e) {
        console.log(e)
    }
}