const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://maksym-ionutsa.com/path'
    const actual = normalizeURL(input)
    const expected = 'maksym-ionutsa.com/path'
    expect(actual).toEqual(expected)
} )

test('normalizeURL strip backslash', () => {
    const input = 'https://maksym-ionutsa.com/path/'
    const actual = normalizeURL(input)
    const expected = 'maksym-ionutsa.com/path'
    expect(actual).toEqual(expected)
} )

test('normalizeURL case insensitivity', () => {
    const input = 'https://MAKSYM-ionutsa.com/path/'
    const actual = normalizeURL(input)
    const expected = 'maksym-ionutsa.com/path'
    expect(actual).toEqual(expected)
} )