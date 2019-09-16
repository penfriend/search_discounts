const rp = require('request-promise');
const cheerio = require('cheerio'); // Basically jQuery for node.js

async function parsePage(url, page) {
    const options = {
        uri: `${url}?p=${page}`,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    const $ = await rp(options)

    const $total = $('.round-btn.active.total');
    const total = $total.text().replace(/[^\d]/g, '');

    const list = $('#product-listing-wrap');
    const data = [];
    list.find('.product_box').each((index, product) => {
        // console.log({ index, product });
        const html = $(product).html();
        const $product = cheerio.load(html)
        
        const link = $product('a img').attr('src');
        const price = $product('.price').text();
        data.push({ link, price});
    });
    
    return {total, data};
}

// parsePage(1).then((list) => console.log('list:', list));

async function parseSection(url) {
    const {total} = await parsePage(url, 0);
    return Promise.all(Array(Math.ceil(total / 20)).fill().map((_, i) => parsePage(url, i + 1))).then((res) => {
        console.log('loaded:', url);
        return res.map(({data}) => data).reduce((acc, arr) => acc.concat(arr), []);
    });
}

async function initParse() {
    const data = await parseSection('https://eva.ua/220-271-272/stiralnye-poroshki/');
    return [
        data
    ];
}

// initParse().then(console.log)

module.exports = {
    parseSection
}
