const {JSDOM} = require('jsdom')

function normalizeURL(url) {
    url = new URL(url)
    const pathname = url.pathname.at(-1) === '/' ? url.pathname.slice(0, -1) : url.pathname
    return `http://${url.hostname}${pathname}`
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

async function getPageHTML(currentURL) {
    const response = await fetch(currentURL, {
        method: 'GET',
        mode: 'cors'
    })
    if (response.status >= 400) {
        throw new Error(`Could not get data. Status ${response.status}`)
    }
    if (!response.headers.get('content-type').includes('text/html')) {
        throw new Error(`Invalid Content-Type: ${response.headers['Content-Type']}`)
    }
    const body = await response.text()
    return body
}

async function crawlPage(baseURL, currentURL, pages) {
    if (new URL(baseURL).hostname !== new URL(currentURL).hostname) {
        return pages
    }
    const norm_url = normalizeURL(currentURL)
    if (pages[norm_url] !== undefined) {
        console.log(`Already visited ${norm_url}`)
        pages[norm_url]++
        return pages
    }
    if (norm_url === baseURL) {
        pages[norm_url] = 0
    } else {
        pages[norm_url] = 1
    }
    // console.log(`Fetching data from ${currentURL}`)
    let page_html
    try {
        page_html = await getPageHTML(currentURL)
    } catch (err) {
        console.log(`Error at ${currentURL} : ${err}`)
        return pages
    }
    const all_urls = getURLsFromHTML(page_html, baseURL)
    for (url of all_urls) {
        pages = await crawlPage(baseURL, url, pages)
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}