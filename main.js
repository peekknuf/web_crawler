const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
    if (process.argv.length < 3) {
        console.log('gimme a valid web ffs')
        process.exit(1)
    }

    if (process.argv.length > 3) {
        console.log('holds your horses buddy, one"s enough')
        process.exit(1)
    }
    const theURLgiven = process.argv[2]

    console.log(`the crawl of ${theURLgiven} goes brrrrrr`)

    const pages = await crawlPage(theURLgiven, theURLgiven,{})

    printReport(pages)
}

main()
