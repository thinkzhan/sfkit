import { Controller, Get } from '../decorator/router';
import Log from '../decorator/log';

@Controller('/')
export default  class AppController {
    @Get('/single*')
    @Log
    async getSinglePage(ctx) {
        await ctx.renderServer('single', {
            state: {
                isSsr: true
            }
        });
    }

    @Get('/router*')
    @Log
    async getRouterPage(ctx) {
        await ctx.renderServer('router');
    }

    @Get('/redux*')
    @Log
    async getReduxPage(ctx) {
        await ctx.renderServer('redux');
    }
}
