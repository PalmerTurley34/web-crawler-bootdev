const {test, expect} = require('@jest/globals')
const {normalizeURL} = require('./crawl')

test('test http and https are the same', () => {
    const https_url = 'https://example.com'
    const http_url = 'http://example.com'
    expect(normalizeURL(https_url)).toBe(normalizeURL(http_url))
})

test('test ending / is removed', () => {
    const with_slash = 'http://example.com/some/path/'
    const without_slash = 'http://example.com/some/path'
    expect(normalizeURL(with_slash)).toBe(normalizeURL(without_slash))
})

test('test query parameters are removed', () => {
    const with_query = 'http://example.com/path?query=something&parameter=else'
    const without_query = 'http://example.com/path'
    expect(normalizeURL(with_query)).toBe(normalizeURL(without_query))
})

test('combination of other tests', () => {
    const test1 = normalizeURL('https://example.com/path/?something=true')
    const test2 = normalizeURL('http://example.com/path?more=queries&second=query')
    const test3 = normalizeURL('http://example.com/path')

    expect(test1).toBe(test2)
    expect(test2).toBe(test3)    
})