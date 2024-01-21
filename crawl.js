function normalizeURL(url) {
    const urlObject = new URL(url)
    const pathname = urlObject.pathname.at(-1) === '/' ? urlObject.pathname : `${urlObject.pathname}/`
    return `${urlObject.hostname}/${pathname}`
}

const url = new URL('http://example.com/path/')

module.exports = {
    normalizeURL
}