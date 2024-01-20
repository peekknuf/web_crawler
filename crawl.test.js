const { normalizeURL,getURLfromHTML } = require('./crawl.js')
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

test('getURLfromHTML absolute', () => {
    const inputHTML = `
    <html>
            <body>
                <a href="https://maksym-ionutsa.com/path">
                Visit Maksym Ionutsa's website
                </a>
            </body>
    </html>
    `

    const inputBaseURL = 'https://maksym-ionutsa.com/path'
    const actual = getURLfromHTML(inputHTML, inputBaseURL)
    const expected = ['https://maksym-ionutsa.com/path']
    expect(actual).toEqual(expected)
} )


test('getURLfromHTML relative', () => {
    const inputHTML = `
    <html>
            <body>
                <a href="https://maksym-ionutsa.com/path">
                Visit Maksym Ionutsa's website
                </a>
            </body>
    </html>
    `

    const inputBaseURL = 'https://maksym-ionutsa.com'
    const actual = getURLfromHTML(inputHTML, inputBaseURL)
    const expected = ['https://maksym-ionutsa.com/path']
    expect(actual).toEqual(expected)
} )


test('getURLfromHTML invalid', () => {
    const inputHTML = `
    <html>
            <body>
                <a href="yo">
                not a thing eh
                </a>
            </body>
    </html>
    `

    const inputBaseURL = 'https://maksym-ionutsa.com'
    const actual = getURLfromHTML(inputHTML, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
} )