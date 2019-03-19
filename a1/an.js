let Ut = require("./ut");

(function() {
    try {
        let url = "https://app.www.gov.cn/govdata/html5/2018zfgzbgskwn/logo.png";
        let opts = {
            url: url,
        };
        let path = "./1.jpg";
        let r1 =  Ut.downImg(opts, path);
        console.log(r1);
    }
    catch (e) {
        console.log(e);
    }
})()