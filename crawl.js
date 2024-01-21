const {JSDOM} = require('jsdom')

function normalizeURL(url) {
    const urlObject = new URL(url)
    const pathname = urlObject.pathname.at(-1) === '/' ? urlObject.pathname : `${urlObject.pathname}/`
    return `${urlObject.hostname}/${pathname}`
}

function getURLsFromHTML(htmlDoc, baseURL) {
    const dom = new JSDOM(htmlDoc)
    const a_tags = dom.window.document.querySelectorAll('a')
    const urls = []
    for (tag of a_tags) {
        if (tag.href[0] === '/') {
            urls.push(`${baseURL}${tag.href}`)
        } else {
            urls.push(tag.href)
        }
    }
    return urls
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}