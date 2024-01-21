const {test, expect} = require('@jest/globals')
const {JSDOM} = require('jsdom')
const {normalizeURL, getURLsFromHTML} = require('./crawl')

test('test normilizeURL', () => {
    const https_url = normalizeURL('https://example.com')
    const http_url = normalizeURL('http://example.com')
    const with_slash = normalizeURL('http://example.com/some/path/')
    const without_slash = normalizeURL('http://example.com/some/path')
    const with_query = normalizeURL('http://example.com/path?query=something&parameter=else')
    const without_query = normalizeURL('http://example.com/path')
    const test1 = normalizeURL('https://example.com/path/?something=true')
    const test2 = normalizeURL('http://example.com/path?more=queries&second=query')
    const test3 = normalizeURL('http://example.com/path')
    expect(https_url).toBe(http_url)
    expect(with_slash).toBe(without_slash)
    expect(with_query).toBe(without_query)
    expect(test1).toBe(test2)
    expect(test2).toBe(test3)    
})

test('test getURLsFromHTML', () => {
    const testhtml1 = `<html><body><a href="http://example.com"></a></body></html>`
    const testhtml2 = `<html><body><a href="/test"></a></body></html>`
    const testhtml3 = `<html><body><a href="/test"></a><a href="/test/24"></a></body></html>`
    const testBase = 'http://example.com'
    const test1 = getURLsFromHTML(testhtml1, testBase)
    const test2 = getURLsFromHTML(testhtml2, testBase)
    const test3 = getURLsFromHTML(testhtml3, testBase)
    const expected1 = ['http://example.com/']
    const expected2 = ['http://example.com/test']
    const expected3 = ['http://example.com/test', 'http://example.com/test/24']
    expect(test1).toStrictEqual(expected1)
    expect(test2).toStrictEqual(expected2)
    expect(test3).toStrictEqual(expected3)
})