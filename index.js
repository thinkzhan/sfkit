require('shelljs/global');
const console = require('sfconsole')("vtl-kit", true);
const inquirer = require('inquirer')


const gitRepoMap = {
    'single-js': 'https://github.com/liberalist1991/single-js.git',
    'velocity-mutil-page': 'https://github.com/liberalist1991/velocity-mutil-page.git',
    'mdev-mutil-page': 'https://github.com/liberalist1991/mdev-mutil-page.git'
}

module.exports = {
    template: '',
    projectName: '',

    init(opts) {

            this.askTemplate().then(answers => {
                this.template = answers.template;
                this.askName().then(answers => {
                    this.projectName = answers.projectName || this.template;

                    console.log(this.template);
                    console.log(this.projectName);

                    console.info('init seed....');
                    exec(`git clone ${gitRepoMap[this.template]} ${this.projectName}`);

                    console.info('install dependencies....');
                    exec(`cd ${this.projectName} && npm install`);
                    console.info(`init ${this.projectName} ok! cd ${this.projectName} && npm run dev`);

                });

            })


        },

        askTemplate() {
            return inquirer.prompt([{
                type: 'list',
                name: 'template',
                message: '以下模版可选：',
                choices: [{
                        key: 'a',
                        name: 'single-js                   一个单文件js',
                        value: 'single-js'
                    }, {
                        key: 'b',
                        name: 'velocity-mutil-page         一个多页项目',
                        value: 'velocity-mutil-page'
                    }, {
                        key: 'c',
                        name: 'mdev-mutil-page             一个兼容mdev的多页项目',
                        value: 'mdev-mutil-page'
                    }

                ]
            }]);
        },

        askName() {
            var questions = [{
                type: 'input',
                name: 'projectName',
                message: '输入项目名称：'
            }];

            return inquirer.prompt(questions)
        }
}
