function normalizeURL(url) {
    url = url.split('://')[1]
    url = url.split('?')[0]
    if (url.at(-1) === '/') {
        url = url.slice(0, -1)
    }
    return url
}

module.exports = {
    normalizeURL
}