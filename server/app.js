const express = require("express")
const bodyParser = require("body-parser")
const multer = require("multer")
const excelParse = require('./excelParse')
const xlsx = require('node-xlsx')
const server = express();
const uploadPath = './static/upload'
const path = require('path')
const mkdir = require('../util/mkdir')
const child_process = require('child_process')
const webDriver = require('selenium-webdriver')
const By = webDriver.By
const until = webDriver.until
const fs = require('fs')
let upload = multer({ dest: uploadPath })
let driver;
server.use(bodyParser.json())

server.use(bodyParser.urlencoded({ extended: true }))
/**
 * 跨域设置
 * 
 */
server.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

server.options('*', (req, res) => {
    res.json({
        status: 'OK'
    });
});

server.use('/startTask', function (req, res) {
    if (driver) driver.close()

    //切换ip
    // let bat = child_process.exec(req.query.appPath + ' -changeproxy/AU', function (error, stdout, stderr) {
    //     console.log(error, stdout, stderr)

    // })

    //自动化操作
    require('chromedriver')
    driver = new webDriver
        .Builder()
        .forBrowser('chrome')
        //.setChromeOptions(new chrome.Options().addArguments(['user-agent="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"']))
        .build()
    driver.get('https://whoer.net/zh')
    driver.sleep(10000).then(function () {
        return Promise.all([
            driver.findElement(By.partialLinkText('您的匿名性')).getText(),
            driver.findElement(By.className('your-ip')).getText(),
            driver.findElement(By.xpath('//*[@id="content"]/div[1]/div/div[2]/dl/dd[1]/div[2]/div/div/span[2]')).getText()
        ])
    }).then(function (txt) {
        let ipInfo = {
            anonymous: txt[0].split(': ')[1].replace('%', ''),
            ip: txt[1],
            country: txt[2]
        }
        if (true) {
            driver.get('http://www.youku.com')
            return driver.sleep(8000)
        }
        // if (ipInfo.anonymous < 90) res.json({ status: false, data: ipInfo, msg: '当前的ip匿名度太低' })
    }).then(function(res){
        console.log(111111111)
    })
    // res.json({ status: 'ok', msg: '任务初始化中S...' })
})

server.use('/switchIp', function (req, res) {

})


server.use('/excel', upload.any(), function (req, res) {
    mkdir(path.join(__dirname, '../') + '\static\\upload\\', req.files[0].filename).then(function (status) {
        let parseData = [];
        let getFileName = req.files[0].filename
        let filePath = uploadPath + '/' + getFileName
        let excelData = xlsx.parse(filePath)[0].data
        if (excelData.length < 1) return
        let tableHead = excelData[0].filter(function (item) {
            return item === item
        })
        excelData.map(function (data) {
            let obj = {}
            if (!data.length) return
            data.forEach(function (item, index) {
                obj[tableHead[index]] = item
            });
            parseData.push(obj)
        })
        res.json({ status: 200, data: parseData })
    })
})

server.listen(3000, () => {
    console.log("Server is runnig at htttp://localhost:3000");
})


