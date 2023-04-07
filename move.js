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
const emptyDir = (dir) => {
  // 检查目录是否存在，如果不存在则退出函数
  if (!fs.existsSync(dir)) return;

  // 获取目录下的所有文件和文件夹
  const files = fs.readdirSync(dir);

  // 遍历所有文件和文件夹，递归删除文件夹和文件
  for (let file of files) {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      emptyDir(filePath);
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }
};
emptyDir("docs");
// 复制 src 目录下的所有文件和文件夹到 dist 目录下
copyDir("doc/.vitepress/dist", "docs");
