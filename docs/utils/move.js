// 本用来动态生成部署github 后边使用 github action 之后这玩意就废了

//生成github需要的文件目录
const fs = require("fs");
const path = require("path");

const copyDir = (src, dest) => {
  // 检查源目录是否存在，如果不存在则退出函数
  if (!fs.existsSync(src)) return;

  // 检查目标目录是否存在，如果不存在则创建目标目录
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  // 获取源目录下的所有文件和文件夹
  const files = fs.readdirSync(src);

  // 遍历所有文件和文件夹，递归复制文件夹和文件
  for (let file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};
const deleteDir = (dirPath) => {
  // 判断文件是否存在
  if (fs.existsSync(dirPath)) {
    // 删除目录下的所有文件和子目录
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      fs.statSync(curPath).isDirectory()
        ? deleteDir(curPath)
        : fs.unlinkSync(curPath);
    });

    // 删除当前目录
    fs.rmdirSync(dirPath);
  }
};

// 删除 docs 目录及其下所有文件和子目录
// deleteDir("/docs");
// 复制 src 目录下的所有文件和文件夹到 dist 目录下
// copyDir("/doc/.vitepress/dist", "docs");
