
const fs = require("fs")
const cheerio = require("cheerio")
const request = require("request")

const source = require('./source')
// console.log(source)

let i = 0

let imagesMap = Object.create(null)

// 去除重複
for(let key in source) {
    let url = source[key].image

    let ext = url.split('.')
    ext = ext[ext.length - 1]

    if (!imagesMap[url]) {
        imagesMap[url] = 'assets/images/x' + ++i + '.' + ext
    }
}

// for (let key in imagesMap) {
//     request(key).pipe(fs.createWriteStream(imagesMap[key]))
// }

let newSource = source.map(function (item) {
    item.image = imagesMap[item.image]
    return item
})

fs.writeFileSync('newSource.json', JSON.stringify(newSource), function (err) {
    if(err) console.log(err)
    else console.log('写文件操作成功');
})


