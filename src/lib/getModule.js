export default function(moduleContext) {
    const keys = moduleContext.keys();
    const modules = {};

    keys.forEach(item => {
        modules[
            item
                .split('/')
                .pop()
                .split('.')[0]
        ] = moduleContext(item).default;
    });

    return modules;
}
