const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dirs = fs
  .readdirSync('./')
  .filter(n => {
    const reg = /^\d\d-\w+/;
    if (reg.test(n)) {
      const stat = fs.statSync(path.resolve(__dirname, n));
      return stat.isDirectory();
    }
    return false;
  });
inquirer.prompt([
  {
    type: 'list',
    message: 'which folder do you want to run the tests?',
    choices: dirs,
    name: 'directory'
  }
]).then(({ directory }) => {
  const cmds = [
    'mocha',
    '--reporter spec',
    '--bail',
    directory + '/test.js'
  ].join(' ');
  execSync(cmds, { stdio: 'inherit' });

  process.exit(0);
});
