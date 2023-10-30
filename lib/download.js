// 拉取git库代码
const downloadGitRepo = require('download-git-repo')
// 添加交互效果
const ora = require('ora')
const util = require('util')
const fs = require('fs')
const path = require('path')

// 改造 download-git-repo 支持 promise, 改造后不需手动创建项目目录
const downloadGit = util.promisify(downloadGitRepo);

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // console.log('args', args);
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    // const result = await fn(...args,{ clone: true });
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result;
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed, refetch ...')
  }
}

// 下载github上的模板到本地
async function download(repo, projectName) {
  let requestUrl = `wanfeizhong/${repo}-cli-web`;
  // 当前命令行选择的目录
  const cwd  = process.cwd();
  // 需要创建的目录地址
  const targetAir  = path.join(cwd, projectName)
  // 判断路径是否存在
  const isMkdirExists = fs.existsSync(
    path.resolve(process.cwd(), `./${projectName}`)
  );
  if (isMkdirExists) {
    console.log(`${projectName}文件夹已经存在`)
    return false;
  }
   // 调用下载方法
   await wrapLoading(
    downloadGit, // 远程下载方法
    'waiting download template', // 加载提示信息
    requestUrl, // 参数1: 下载地址
    path.resolve(process.cwd(), targetAir)) // 参数2: 创建位置
}

// module.exports = downloadFun
module.exports = download

