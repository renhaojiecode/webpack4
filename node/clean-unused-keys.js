const path = require('path')
const { readFileSync, writeFileSync } = require('fs');
const data = require('./i18n-extract-output.json')

const language = ['en-US', 'es-419', 'es-MX', 'ja-JP', 'pt-BR', 'zh-CN'];
const folder = '../../i18n-external'

clean(language, 'total', 'use')
/**
 * 利用 unusedKeys 清除 fromfile 里边未用到的翻译，并生成到 tofile 文件夹
 * @param {*} language 
 * @param {*} fromfile 
 * @param {*} tofile 
 */
function clean(language, fromfile, tofile) {
  let putRightList = getErrorMissingKeys()
  language.forEach(lang => {
    let mapLang = read(`${folder}/${fromfile}/${lang}.js`);

    data.unusedKeys.map(_ => _.path).forEach(key => {
      if (!putRightList.includes(key)) {
        delete mapLang[key]
      }
    })
    writeFileSync(
      path.resolve(__dirname, `${folder}/${tofile}/${lang}.js`),
      'export default ' + JSON.stringify(mapLang, null, 2)
    );
  });
}

/**
 * 由于读取 key 时会转义反斜杠\ 为 \\,并且对应的key 会被识别进入 unusedKeys
 * 所以在这里获取被转义的key 以便从unusedKeys摘出来
 * @returns []
 * exp: "随时随地\\\\n享受\\\\n美好食物" -> 随时随地\\n享受\\n美好食物 
 */
function getErrorMissingKeys() {
  let putRightList = []
  let i18nNewData = read('../zh-CN.js');
  let i18nExternalData = read(`${folder}/total/zh-CN.js`);
  let i18nData = Object.assign({}, i18nExternalData, i18nNewData);
  data.missingKeys.map(_ => _.path).forEach(key => {
    let rightKey = key.replace(/\\\\n/g, '\\n')
    if (key !== rightKey && i18nData[rightKey]) {
      putRightList.push(rightKey)
    }
  })
  return putRightList
}

function read(sourcePath) {
  sourcePath = path.resolve(__dirname, sourcePath);
  let string = readFileSync(sourcePath).toString();
  string = string.replace('export default', '');
  string = string.replace('module.exports = ', '');
  try {
    return JSON.parse(string);
  } catch (e) {
    return {};
  }
}
