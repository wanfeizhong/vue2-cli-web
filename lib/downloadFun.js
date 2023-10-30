const downloadGitRepo = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')


// 判断路径是否存在
function checkMkdirExists(path) {
  return fs.existsSync(path)
};

// 目录守卫，文件夹不存在时创建相应文件夹
function mkdirGuard(target) {
  try {
    // 创建文件夹目录
    fs.mkdirSync(target, { recursive: true });
  } catch (e) {
    mkdirp(target)
    function mkdirp(dir) {
      // 检测目录是否存在，存在则返回true终止递归；
      if (fs.existsSync(dir)) { return true }
      const dirname = path.dirname(dir);
      mkdirp(dirname);
      fs.mkdirSync(dir);
    }
  }
}
const downloadFun = async function(url, project) {
  // console.log('args', args);
  // 当前命令行选择的目录
  const cwd  = process.cwd();
  // 需要创建的目录地址
  const targetAir  = path.join(cwd, project);

  // 判断路径是否存在
  const isMkdirExists = checkMkdirExists(
    path.resolve(process.cwd(), `./${project}`)
  );
  if (isMkdirExists) {
    console.log(`${project}文件夹已经存在`)
    return false;
  }
  // 从本地创建项目文件夹(很重要，如果不先创建，则不能成功的将下载的代码放入指定目录下)
  mkdirGuard(path.resolve(process.cwd(), `./${project}`));
  const spinner = ora({ color: 'yellow' }).start()
  spinner.text = '代码正在下载……'
  // 用node下载并提取一个 git repository (GitHub, GitLab, Bitbucket) ，具体参数可查看文档
  downloadGitRepo(url, path.resolve(process.cwd(), targetAir), {}, err => {
    if (!err) {
      spinner.succeed('代码下载成功')
      console.log(chalk.green.bold('Done!'), chalk.yellow('you run:'));
      console.log(chalk.blue.bold('cd ') + chalk.yellow(project));
      console.log(chalk.blue.bold('npm install'));
      console.log(chalk.blue.bold('npm run dev '));
    } else {
      console.log(err);
      spinner.fail('代码下载失败')
    }
  })
}

module.exports = downloadFun

