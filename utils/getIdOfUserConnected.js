export default async function getIdOfUserConnected(session, setUserConnectedId) {
    try {
        const res = await fetch(`/api/getIdOfUserConnected/`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: session?.user.email}),
        });
        const {user} = await res.json();
        setUserConnectedId(user.id);
    } catch (e) {
        console.log(e);
    }
}