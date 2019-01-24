const fs = require('fs')
const mkdir = function (path, createFile) {
    return new Promise(function (resolve, reject) {
        let files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path)
            files.forEach(function (file, index) {
                let curPath = path + '/' + file
                if (fs.statSync(curPath).isDirectory()) {
                    return mkdir(curPath)
                }
                if (file !== createFile) fs.unlinkSync(curPath)

            })
            return resolve(true)
        }

        reject(false)
    })

}

module.exports = mkdir