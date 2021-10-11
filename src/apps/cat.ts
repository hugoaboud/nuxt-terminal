import { Folder, File } from "@/os/filesystem";
import NuxtTerminalApp from "./App";

export default class cat extends NuxtTerminalApp {

    async main(args: string[]): Promise<number> {

        if (args.length < 2) {
            this.stdout.print('cat: No file specified.\n');
            return -1;
        }

        let node = null;
        try {
            node = this.fs.node(this.node, args[1]);
        }
        catch (e) {
            this.stdout.print(`cat: ${args[1]}: No such file or directory\n`)
            return -1;
        }

        if (node instanceof Folder) {
            this.stdout.print(`cat: ${args[1]}: Is a directory\n`);
            return -1;
        }

        this.stdout.print((node as File).content + '\n');
        return 0;

    }
}