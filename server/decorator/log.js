import R from 'ramda';
const changeToArr = R.unless(
    R.is(Array),
    R.of,
);

let logTimes = 0;
const convert = middleware => (target, key, descriptor) => {
    target[key] = R.compose(
        R.concat(
            changeToArr(middleware)
        ),
        changeToArr,
    )(target[key]);

    return descriptor;
};

const Log = convert(async(ctx, next) => {
    logTimes ++;
    console.time(`${logTimes}: ${ctx.method} - ${ctx.url}`);
    await next();
    console.timeEnd(`${logTimes}: ${ctx.method} - ${ctx.url}`);
});
export default Log;
