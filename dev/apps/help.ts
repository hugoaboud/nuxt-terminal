import Color from '@/os/color';
import NuxtTerminalApp from '../../src/apps/App'

export default class help extends NuxtTerminalApp {

    async main(): Promise<number> {

        this.stdout.print(
            '\n' +
            Color.Green('◼---------------◼') + '\n' +
            Color.Green('| nuxt-terminal |') + '\n' +
            Color.Green('◼---------------◼') + '\n' +
            '\n' +
            `A client-side, shell-like, terminal/OS emulator built with ${Color.Purple('xtermjs')}. Featuring a simple filesystem and an application layer. Wrapped in a Vue Component and ready to be used with ${Color.Green('Nuxt.js')}.\n` +
            '\n' +
            Color.Cyan('GitHub:') + ' https://github.com/hugoaboud/nuxt-terminal.git' + '\n' +
            '\n');
            
        return 0;
    }
}