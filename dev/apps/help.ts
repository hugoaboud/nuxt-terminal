import Color from '@/os/color';
import NuxtTerminalApp from '../../src/apps/App'

export default class help extends NuxtTerminalApp {

    async run(): Promise<number> {

        this.stdout.print(
            Color.Green('◼---------------◼\n') +
            Color.Green('| nuxt-terminal |\n') +
            Color.Green('◼---------------◼\n') +
            '\n\r' +
            'Check out our GitHub!');

        return 0;
    }
}