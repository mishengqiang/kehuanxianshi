#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git config user.name "mishengqiang"
git config user.email "13716526885@139.com"
git add -A
git commit -m ':rocket: deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

git push -f git@gitee.com:mishengqiang/kehuanxianshi.git master:gitee-pages

cd -