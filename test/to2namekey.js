
// 生成文件名组合
const toImgNameGruopKey = async () => {
    let bc = []
    // bc 交换
    for (let b = 0; b < 13; b++) {

        let item = ''
        for (let c = 0; c < 21; c++) {
            item = b + "_" + c
            bc.push(item)
        }
    }

    // bc a 交换
    let abc = []
    for (let bci = 0; bci < bc.length; bci++) {

        let item = ''
        let isstop = false
        for (let a = 0; a < 100; a++) {
            item = a + "_" + bc[bci]
            abc.push(item)
            if (abc.length > 27300 && a === 99) {
                isstop = true
                break
            }
        }

        if (abc.length > 27300 && isstop) {
            break
        }

    }
    return await abc

}

// 某些图片分比例分配
const getlive = async (allkey) => {
    let newAllKey = []
    let r0_r9_10000 = 0
    let r10_r13_5000 = 0
    let r14_r16_2400 = 0
    let r17_r18_1600 = 0
    let r19_r20_1000 = 0
    for (let r = 0; r < allkey.length; r++) {
        let itemkey = allkey[r]
        let rsindex = parseInt(itemkey.split("_")[2])
        // r0 - r9
        if (rsindex > -1 && rsindex < 10 && r0_r9_10000 < 10000) {
            r0_r9_10000++
            newAllKey.push(itemkey)
        }
        // r10 - r13
        if (rsindex > 9 && rsindex < 14 && r10_r13_5000 < 5000) {
            r10_r13_5000++
            newAllKey.push(itemkey)
        }

        // r14 - r16
        if (rsindex > 13 && rsindex < 17 && r14_r16_2400 < 2400) {
            r14_r16_2400++
            newAllKey.push(itemkey)
        }

        // r17 - r18
        if (rsindex > 16 && rsindex < 19 && r17_r18_1600 < 1600) {
            r17_r18_1600++
            newAllKey.push(itemkey)
        }

        // r19 - r20
        if (rsindex > 18 && rsindex < 21 && r19_r20_1000 < 1000) {
            r19_r20_1000++
            newAllKey.push(itemkey)
        }
    }
    console.dir("10000:" + r0_r9_10000)
    console.dir("5000:" + r10_r13_5000)
    console.dir("2400:" + r14_r16_2400)
    console.dir("1600:" + r17_r18_1600)
    console.dir("1000:" + r19_r20_1000)
    return await newAllKey
}


// 输出全部数组
const fs = require('fs');
toImgNameGruopKey().then((keyname) => {
    // console.log(keyname.length)
    getlive(keyname).then((rekeyname) => {
     let data = JSON.stringify(rekeyname);
     fs.writeFileSync('./outjson/allName.json', data);
    })
});

// module.exports = {
//     toImgNameGruopKey
// }

