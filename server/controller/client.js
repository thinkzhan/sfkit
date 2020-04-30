
import { Controller, Get } from '../decorator/router';
import Log from '../decorator/log';

@Controller('/client')
export default class ClientController {
    @Get('/single')
    @Log
    async getSingleClient(ctx) {
        await ctx.renderClient('single', {
            state: {
                isSsr: true
            }
        });
    }
}
