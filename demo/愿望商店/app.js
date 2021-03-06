'use strict'

const fs = require("fs")
const request = require("request")

const source = require('./source')

let i = 0

let imagesMap = Object.create(null)



getImagesMap(source.iv)
getImagesMap(source.ds)
let newSource = {
    iv: getNewSource(source.iv),
    ds: getNewSource(source.ds)
}

// for (let key in imagesMap) {
//     key && request(key).pipe(fs.createWriteStream(imagesMap[key]))
// }


fs.writeFileSync('newSource.json', JSON.stringify(newSource), function (err) {
    if(err) console.log(err)
    else console.log('写文件操作成功');
})


// 去除重複，得到ImagesMap
function getImagesMap(arr) {
    for (let key in arr) {

        let url = arr[key].image

        if (typeof(url) !== "string") {
            url && getImagesMap(url)
        } else {
            if (!imagesMap[url] && url) {
                let ext = url.split('.')
                ext = ext[ext.length - 1]
                imagesMap[url] = "assets/images/x" + i + "." + ext
                i++
            }
        }
    }
}

// 得到新的Source
function getNewSource(arr) {
    return arr.map(function (item) {
        if (typeof(item.image) === "string") {
            item.image = imagesMap[item.image]
        } else {
            if (item.image && item.image.length) {
                item.image = getNewSource(item.image)
            }
        }

        return item
    })
}