const inquirer = require('inquirer')
const util = require('util');
const ora = require('ora')
const path = require('path')
const downloadGitRepo = require('download-git-repo'); // 不支持 Promise
const config = require('../config')
const downloadFun = require('./downloadFun')
// const download = require('./download')


const myAction = async (project, args) => {
  // 命令行的执行逻辑代码
  const answer = await inquirer.prompt([{ // 数组中每一个对象表示一个问题
    type: 'list', // 问题类型，list表示选择列表
    name: 'framework', // 用于接收答案的键值
    choices: config.framework, // 选项
    message: '请选择你所使用的框架' // 问题
  }])
  // download(answer.framework, project);
  // return false;
  // 下载代码模板 https://github.com/wanfeizhong/vue2-cli-web
  let requestUrl = `mengguagua/vue2-web`;
  // downloadFun(`mengguagua/${answer.framework}-web`, project)
  // downloadFun(`direct:${config.frameworkUrls[answer.framework]}`, project)
  downloadFun(requestUrl, project)
}

module.exports = myAction
