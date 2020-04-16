require('shelljs/global');
const axios = require('axios');
const console = require("sfconsole")("sfkit", true);
const inquirer = require("inquirer");
const { promisify } = require('util');
const ora = require('ora');
const downloadGitReop = require('download-git-repo');
const offlineBranchs = require('./offline');

const waitPromise = (fn, msg) => async (...args) => {
    const spinner = ora(msg);
    spinner.start();
    const result = await promisify(fn)(...args);
    spinner.succeed();
    return result;
}
class Kit {
    constructor() {
    }
    async init({ offline = false }) {
        this.branches = await this.getBranches(offline)
        const { template } = await this.askTemplate()
        const { name } = await this.askName()
        const projectName = name || template
        await this.download(template, projectName)
        await this.install(projectName)
    }
    async getBranches(offline) {
        if (offline) {
            return offlineBranchs
        }
        const branchs = []
        try {
            const { data } = await axios.get(`https://api.github.com/repos/thinkzhan/sfkit/branches`);
            data.map(d => {
                if ('master' !== d.name) {
                    branchs.push(d.name)
                }
            })
        } catch (error) {
            console.err('github api间歇性出错，retry');
            console.err('或者使用离线版：sf offline');
            process.exit()
        }
        return branchs
    }
    async download(template, dist) {
        await waitPromise(downloadGitReop, 'download...')(`thinkzhan/sfkit#${template}`, dist)
    }
    async install(projectName) {
        await waitPromise(exec, 'install...')(`cd ${projectName} && rm -rf .git && npm install`)
        console.info(`done! cd ${projectName} && npm run dev`);
    }
    async askName() {
        return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "输入项目名称："
            }
        ]);
    }
    async askTemplate() {
        return inquirer.prompt([
            {
                type: "list",
                name: "template",
                message: "以下模版可选：",
                choices: this.branches
            }
        ]);
    }
}

module.exports = Kit