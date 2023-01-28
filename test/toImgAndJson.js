const fs = require('fs');

// 用to2namekey.js先生产组合
// 引入全部文件数组名
// 如：0_1_1 表示一张图片的组合,对应：a/0.png,b/1.png,c/1.png
const bgimgdata = require("../socimg/img.json")
const kenall = require("../outjson/allName.json")
const {outimg, outjson, imgipfspath, imgwidth, imgheight, endindex} = require("./config");
const { createCanvas, loadImage } = require('../lib');

// img size
const width = imgwidth, height = imgheight;
const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

let r0_r9_10000 = 0
let r10_r13_5000 = 0
let r14_r16_2400 = 0
let r17_r18_1600 = 0
let r19_r20_1000 = 0

// =========20000 内随机命名 set ==========

const copykenall = []
function getArrayItems(){
  let arrIndex = Math.floor(Math.random() * copykenall.length);
  let selindex = copykenall[arrIndex];
  return selindex;
}

function delArrayItems(selindex){
  copykenall.splice(selindex, 1);
}

// =========20000 内随机命名 end ==========

const getSavePath = (rsindex) => {
  let rspath = outimg
  // let rsindex = parseInt(itemkey.split("_")[2])

  // r0 - r9
  if (rsindex > -1 && rsindex < 10 && r0_r9_10000 < 10000) {
    rspath = rspath + "r0_r9_10000/"
    r0_r9_10000++
  }
  // r10 - r13
  if (rsindex > 9 && rsindex < 14 && r10_r13_5000 < 5000) {
      rspath = rspath + "r10_r13_5000/"
      r10_r13_5000++
  }

  // r14 - r16
  if (rsindex > 13 && rsindex < 17 && r14_r16_2400 < 2400) {
      rspath = rspath + "r14_r16_2400/"
      r14_r16_2400++
  }

  // r17 - r18
  if (rsindex > 16 && rsindex < 19 && r17_r18_1600 < 1600) {
      rspath = rspath + "r17_r18_1600/"
      r17_r18_1600++
  }

  // r19 - r20
  if (rsindex > 18 && rsindex < 21 && r19_r20_1000 < 1000) {
      rspath = rspath + "r19_r20_1000/"
      r19_r20_1000++
  }
  return rspath
}

const toImgJson =  () => {
  
  if (kenall.length > 0) {
    let setindex = 0

    for(let n = setindex; n < endindex; n++) {
      copykenall.push(n)
    }

    // let endindex = endindex //20001
    const writeImg = (itemkey) => {

      if (itemkey && setindex < endindex) {
        let imgarr = itemkey.split("_")
        if (imgarr instanceof Array) {
          
          // Extract file path
          const urla = './socimg/bg/' + imgarr[0] + '.png';
          const urlb = './socimg/left/' + imgarr[1] + '.png';
          const urlc = './socimg/right/r' + imgarr[2] + '.png';

          loadImage(urla).then((aimg) => {
            context.drawImage(aimg, 0, 0, width, height)
            loadImage(urlb).then((bimage) => {
              context.drawImage(bimage, 0, 0, width, height)
              loadImage(urlc).then((cimage) => {
                context.drawImage(cimage, 0, 0, width, height)
                const buffer = canvas.toBuffer('image/png')
                let savepath = getSavePath(parseInt(imgarr[2]))
                if (!savepath) {
                  process.stdout.clearLine()
                  process.stdout.write(`\r save path Error`)
                }

                let refileName = getArrayItems();
                fs.writeFile(savepath + refileName + '.png', buffer, () => {
                  context.clearRect(0, 0, width, height);
                  setindex++
                  if (kenall[setindex]) {
                     delArrayItems(refileName);
                     toJsonFile(refileName, imgarr).then(() => {
                       writeImg(kenall[setindex])
                     })
                  }
                  process.stdout.clearLine()
                  process.stdout.write(`\rcompleted: ${setindex}.png`)
                })
              });
            });
          });
        }
      }
    }

    setTimeout(()=>{
      writeImg(kenall[setindex])
    },450)

  }
}

const getBgImgItem = (id) => {
  let item = bgimgdata.find((item)=>{
     return id === item.Id
  })
  return item
}
const getrignth = (index) => {
  let rbname = "";
  let ration = 0;
  // r0 - r9
  if (index > -1 && index < 10) {
    rbname = "Legendary"
    ration = 0
  }

  // r10 - r13
  if (index > 9 && index < 14) {
    rbname = "rare"
    ration = 20
  }

  // r14 - r16
  if (index > 13 && index < 17) {
    rbname = "sr"
    ration = 40
  }

  // r17 - r18
  if (index > 16 && index < 19) {
    rbname = "ssr"
    ration = 60
  }

  // r19 - r20
  if (index > 18 && index < 21) {
    rbname = "ur"
    ration = 70
  }
  return {rbname: rbname, Ratio: ration}
}

const lTopName = (index) => {
  let ltName = ""
  let litems = [
    {id: 0, name: "Wen Moon"},
    {id: 1, name: "Ser"},
    {id: 2, name: "Probably Nothing"},
    {id: 3, name: "Ngmi"},
    {id: 4, name: "McDonald`s"},
    {id: 5, name: "LFG"},
    {id: 6, name: "Gm"},
    {id: 7, name: "Fren"},
    {id: 8, name: "FOMO"},
    {id: 9, name: "Cope"},
    {id: 10, name: "Bule Chips"},
    {id: 11, name: "Apeing"},
    {id: 12, name: "1:1 Art"},
  ]
  ltName = litems.find((ritem) => {
    return ritem.id === index
  })
  return ltName.name
}

// 目录名
const getRace = (listName) => {
  let lists = [
    {"id": "ghost", "HP": "15", "attack": "30", "defence": "20", "speed": "30"},
    {"id": "water", "HP": "20", "attack": "20", "defence": "15", "speed": "15"},
    {"id": "fire", "HP": "10", "attack": "30", "defence": "15", "speed": "25"},
    {"id": "air", "HP": "15", "attack": "25", "defence": "25", "speed": "30"},
    {"id": "dragon", "HP": "20", "attack": "30", "defence": "20", "speed": "15"},
    {"id": "plant", "HP": "15", "attack": "10", "defence": "20", "speed": "30"},
    {"id": "electric", "HP": "30", "attack": "25", "defence": "20", "speed": "30"},
    {"id": "wildmutt", "HP": "25", "attack": "25", "defence": "15", "speed": "25"},
    {"id": "poison", "HP": "20", "attack": "25", "defence": "30", "speed": "20"},
    {"id": "floor", "HP": "30", "attack": "25", "defence": "20", "speed": "25"},
  ]
  return lists.find((ritem) => {
    return ritem.id === listName
  })
}

// 生成每一个图片对于的json文件(opensae)接口标准
const getImgtype = (imgitemkey) => {
// imgitemkey[0]b,[1]l,[2]r
  let arryitem = getBgImgItem(imgitemkey[0]+"")
  // console.dir(arryitem)
  // 背景名称
  let bgname = arryitem.fileNameEn;

  // 右下脚名称,增量值
  let {rbname, Ratio} = getrignth(parseInt(imgitemkey[2]))
  // 左上角名称
 // console.dir(imgitemkey[1])
  let ltName = lTopName(parseInt(imgitemkey[1]))
  // 目录项目
  let listattr = getRace(arryitem.listNameEn)

  // 获取增量值:ration
  let {HP, attack, defence, speed} = listattr

  let hpsum = parseInt(HP) + Ratio
  let attacksum = parseInt(attack) + Ratio
  let defencesum = parseInt(defence) + Ratio
  let speedsum = parseInt(speed) + Ratio

  let itemattr =  [
    {"trait_type": "monsterName","value": bgname},//背景图的名字,可能会有重复的名字，不过这是设计如此
    {"trait_type": "accessories","value": rbname},//右下角饰品
    {"trait_type": "slogon","value": ltName},//左上角标签
    {"trait_type": "GenoType","value": "T1"},//取值都是T1
    {"trait_type": "Level","value": 1},//取值都是1
    {"trait_type": "HP","value": hpsum},
    {"trait_type": "attack","value": attacksum},
    {"trait_type": "defence","value": defencesum},
    {"trait_type": "speed","value": speedsum},
    {"trait_type": "slot1","value": ""},
    {"trait_type": "slot2","value": ""},
    {"trait_type": "slot3","value": ""}
    ]

  return itemattr
}


// ipfs img gateway 图片网关
// imgipfspath
const toJsonFile = async (itemkey, item) => {
  let itemattr = getImgtype(item)

  let itemObj = {
    "name": "ThemisMon-#" + itemkey + "",
    "image": imgipfspath + itemkey + ".png",
    "attributes": itemattr
  };
  let data = JSON.stringify(itemObj);
  await fs.writeFileSync(outjson + itemkey + '.json', data);
}

toImgJson()