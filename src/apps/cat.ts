import { Folder, File } from "@/os/filesystem";
import { TerminalApp } from "./TerminalApp";

export default class cat extends TerminalApp {

    async run(args: string[]): Promise<number> {

        if (args.length < 2) {
            this.stdout.print('cat: No file specified.');
        }

        let node = null;
        try {
            node = this.fs.node(this.node, args[1]);
        }
        catch (e) {
            this.stdout.print(`cat: File ${args[1]} not found`)
            return -1;
        }

        if (node instanceof Folder) {
            this.stdout.print(`cat: '${args[1]}': Is a directory`);
            return -1;
        }

        this.stdout.print((node as File).content.replace(/\n/g,'\n\r'));
        return 0;

    }
}