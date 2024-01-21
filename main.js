const { argv } = require('node:process')
const {crawlPage} = require('./crawl')

async function main() {
    if (argv.length !== 3) {
        const num_args = argv.length - 2
        throw new Error(`Must provide a single URL path to crawl. ${num_args} provided`)
    }
    const baseURL = argv[2]
    console.log(`Starting crawler at ${baseURL}...`)
    const pageCount = await crawlPage(baseURL, baseURL, {})
    console.log(pageCount)
}   

main()