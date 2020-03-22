import 'style/common.scss';
import velocityjs from 'velocityjs';

const tpl = velocityjs.render('<div>${data}</div>', {
    data: 'hi'
});
console.log(tpl);

