
const fs = require("fs")
const cheerio = require("cheerio")
const request = require("request")
// var iconv = require('iconv-lite');
//
// let html = fs.readFileSync('./index.html')
// var myHtml2 = iconv.decode(html, 'utf8');
//
// console.log(myHtml2)

let html = fs.readFileSync('index.html', 'utf8')
console.log(html)
