require("shelljs/global");
const console = require("sfconsole")("sf-kit", true);
const inquirer = require("inquirer");
const tplMap = require("./map");

module.exports = {
    template: "",
    projectName: "",

    init() {
        this.askTemplate()
            .then(answers => {
                this.template = answers.template;
                return this.askName();
            })
            .then(answers => {
                this.projectName = answers.projectName || this.template;
                console.info("init seed....");
                console.info(
                    `clone ${tplMap[this.template]["branch"]} ==> ${
                        this.projectName
                    }`
                );
                exec(
                    `git clone -b ${tplMap[this.template]["branch"]} ${
                        tplMap[this.template]["repo"]
                    } ${this.projectName}`
                );

                console.warn("install dependencies...  several minutes");
                exec(`cd ${this.projectName} && npm install`);
                console.warn(
                    `init ${this.projectName} ok! cd ${
                        this.projectName
                    } && npm run dev`
                );
            });
    },

    askName() {
        return inquirer.prompt([
            {
                type: "input",
                name: "projectName",
                message: "输入项目名称："
            }
        ]);
    },

    askTemplate() {
        let choices = [];

        Object.keys(tplMap).forEach((key, index) => {
            choices.push({
                key: index,
                name: tplMap[key].desc,
                value: key
            });
        });

        return inquirer.prompt([
            {
                type: "list",
                name: "template",
                message: "以下模版可选：",
                choices: choices
            }
        ]);
    }
};
