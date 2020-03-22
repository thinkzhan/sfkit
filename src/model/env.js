export let env = 'test'; // 'mock' / 'dev' / 'test' / 'work'
export let baseUrl = 'https://domain.focus.cn';

switch (env) {
    case 'mock':
        baseUrl = 'http://domain.focus-dev.cn';
        break;
    case 'dev':
        baseUrl = 'http://domain.focus-dev.cn';
        break;
    case 'test':
        baseUrl = 'http://domain.focus-test.cn';
        break;
}
