const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')

const downloadFun = function (url, project) {
  // 当前命令行选择的目录
  const cwd  = process.cwd();
  // 需要创建的目录地址
  const targetAir  = path.join(cwd, project)
  const spinner = ora({ color: 'yellow' }).start()
  spinner.text = '代码正在下载……'
  download(url, targetAir, { clone: true }, err => {
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

