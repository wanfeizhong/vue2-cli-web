#!/usr/bin/env node

const program = require('commander');
const action = require('../lib/action');

program.command('create <project> [other...]') // 自定义 create 命令，接收一个必填参数 project，[other...] 表示其他参数
  .alias('crt') // 别名，之后运行 mycli create ... 和 mycli crt ... 效果是一样的
  .description('创建项目') // 描述
  .option('-f, --force', 'overwrite target directory if it exist') // 当文件夹已经存在,是否强制创建
  .action((project, args) => { // 命令行的执行逻辑代码
    console.log(project)
    console.log(args);
    action(project, args);
  })

program.parse(process.argv); // 表示使用 Commander 来处理命令行参数

console.log('Welcome to ivue-cli World');
