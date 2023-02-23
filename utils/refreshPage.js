export default function refreshPage(router) {
    router.push({
        pathname: router.pathname,
        query: router.query,
    }, undefined, {scroll: false})
}