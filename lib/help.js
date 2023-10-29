const myhelp = function (program) {
  program.version('1.0.0') // 这里可以顺便添加版本信息
  program.option('-f --framework <framework>', '设置框架')
}

module.exports = myhelp;
