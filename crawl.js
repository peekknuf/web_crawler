const {JSDOM} = require('jsdom')


async function crawlPage (baseURL, currentURL, pages) {
    const baseURLobj = new URL(baseURL) 
    const currentURLobj = new URL(currentURL)
    if (baseURLobj.hostname !== currentURL.hostname) {
        return pages
    }
    
    const normCurrURL = normalizeURL(currentURL)
    if (pages[normCurrURL] > 0){
        pages[normCurrURL]++
        return pages
    }
    
    pages[normCurrURL] = 1
    console.log('know that im working hard boss')

    try {
        const response = await fetch(currentURL)
        
        if (response.status > 399){
            console.log(`we got ${response.status} code on ${currentURL} boss`)
            return pages
        } 

        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`that is not text or html output boss`)
            return pages
        }
        const htmlBody = await response.text()
        const nextURLs = getURLfromHTML(htmlBody, baseURL)

        for (nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch(err){
        console.log(`boss, we fucked up on ${currentURL}`)
    }
    return pages
}

function getURLfromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0,1) === '/') {
            //relative
            urls.push(`${baseURL}${linkElement}`)
        } else if (linkElement.href.slice(0,4) === 'http') {
            //absolute
            urls.push(linkElement.href)
        } else {
            //error handling skills at my best
            console.log('fuck you gimme a valid url.')
        }
       
    }
    return urls 
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1)=== '/'){
        return hostPath.slice(0,-1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLfromHTML,
    crawlPage
}