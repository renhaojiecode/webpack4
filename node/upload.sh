#!/bin/bash

rootDir="soda_static/c/webapp/"
uploadapi="http://xx.xx:8000/resource/${rootDir}"


# 文件名称不变，才需要刷新
# 刷新地址与访问地址不匹配，刷新会失效
refreshapi="http://xx.com?region=global"
publishdir="img0.xx.com/static/${rootDir}"

file=$(find . -name grayscaleConfig.js)
# 批量上传
function upload() {
  echo "======== 正在上传配置文件 ========"
  if [ -f $file ]; then
    echo "正在上传: $file"
    curl "$uploadapi$file" -X POST -F filecontent=@"$file" -w "\n"
  fi
}

function refresh() {
  curl -X POST $refreshapi -d "urls=http://$publishdirf"
  curl -X POST $refreshapi -d "urls=https://$publishdir"
}

upload
refresh