import { Color } from '@/os/color';
import { TerminalApp } from '../../src/apps/TerminalApp'

export default class help extends TerminalApp {

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