function printReport(pages) {
    pagesArray = sortPages(pages)
    for (const page of pagesArray) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }
}

function sortPages(pages) {
    pageArray = []
    for (var page in pages) {
        pageArray.push([page, pages[page]])
    }
    pageArray.sort((a, b) => {return b[1] - a[1]})
    return pageArray
}

module.exports = {
    printReport
}