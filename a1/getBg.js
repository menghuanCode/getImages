const Ut = require('./ut')

const http = require('http');
const iconv = require('iconv-lite');
const path = require('path')


const web = 'https://h5.m.jd.com/dev/2YwF2onbSimLzB9XKNq7nB3RQrqY';
const url = `http://storage.360buyimg.com/babel/00092435/192918/production/dev/app.css?t=20180108154413`;
let Images = [];

function parseSrc(src) {
    if (src.indexOf('./') !== -1) {
        src = src.slice(2)
    }

    return web + '/' + src;
}

function makemap(str) {
    let map = str.splice(',');
    return function (key) {
        return map[key]
    }
}

http.get(url, function(res) {

    let chunks = [];

    res.on('data', function(chunk) {
        chunks.push(chunk);
    });

    res.on('end', function() {
        let html = iconv.decode(Buffer.concat(chunks), 'utf8');

        let Images = html.match(/(?=\/\/)[^)]+/g);
        let ImagesMap = makemap('jpg,jpeg,png,gif');

        Images.filter(item => {
            let spl = item.splice('.');
            let affix = spl[spl.length - 1];
        })

        console.log(Images)

        for (let image of Images) {
            // let imgArr = image.split('/');
            // let src = imgArr[imgArr.length - 1]
            //
            // src = path.join('dist', src);
            //
            // Ut.downImg('http:' + image, src)
        }

    });

});