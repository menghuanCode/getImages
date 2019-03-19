const Ut = require('./ut')

const cheerio = require('cheerio')
const https = require('https');
const iconv = require('iconv-lite');
const path = require('path')


const web = 'https://h5.m.jd.com/dev/2YwF2onbSimLzB9XKNq7nB3RQrqY/index.html';
const url = `${web}/mobile.html`;
let Images = [];

function parseSrc(src) {
    if (src.indexOf('./') !== -1) {
        src = src.slice(2)
    }

    return web + '/' + src;
}

https.get(url, function(res) {

    let chunks = [];

    res.on('data', function(chunk) {
        chunks.push(chunk);
    });

    res.on('end', function() {
        let html = iconv.decode(Buffer.concat(chunks), 'utf8');
        console.log(html)

        const $ = cheerio.load(html);

        $('img').each(function (i, el) {
            let $el = $(el);
            let src = $el.attr('src');
            Images.push(parseSrc(src));
        })


        for (let image of Images) {
            let imgArr = image.split('/');
            let src = imgArr[imgArr.length - 1]

            src = path.join('dist', src);

            Ut.downImg(image, src)
        }

    });

});