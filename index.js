require('shelljs/global');
const console = require('sfconsole')("vtl-kit", true);
const inquirer = require('inquirer')


const gitRepoMap = {
    'single-js': 'https://github.com/liberalist1991/single-js.git',
    'velocity-mutil-page': 'https://github.com/liberalist1991/velocity-mutil-page.git',
    'mdev-mutil-page': 'https://github.com/liberalist1991/mdev-mutil-page.git',
    'mdev-mutil-page-h5': 'https://github.com/liberalist1991/mdev-mutil-page-h5.git'

}

module.exports = {
    template: '',
    projectName: '',

    init(opts) {

            this.askTemplate().then(answers => {
                this.template = answers.template;
                this.askName().then(answers => {
                    this.projectName = answers.projectName || this.template;

                    console.warn('init seed....');
                    exec(`git clone ${gitRepoMap[this.template]} ${this.projectName}`);

                    console.warn('install dependencies...  several minutes');
                    exec(`cd ${this.projectName} && npm install`);
                    console.warn(`init ${this.projectName} ok! cd ${this.projectName} && npm run dev`);

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
                    }, {
                        key: 'd',
                        name: 'mdev-mutil-page-h5             一个兼容mdev的多页h5项目',
                        value: 'mdev-mutil-page-h5'
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
