import { File } from "@/os/filesystem";
import NuxtTerminalApp from "./App";

export default class ls extends NuxtTerminalApp {
    
    async main(args: string[]): Promise<number> {

        let path = args[1] || '';

        let node = this.node;
        if (path) {
            try {
                node = this.fs.node(this.node, path)!;
            }
            catch (e) { 
                this.stdout.print(e as string); 
                return -1;
            }
            if (node instanceof File) {
                this.stdout.print(`file  ${node.name}\n`);
                return -1;
            }
        }

        Object.keys(node.children).map(ch => {
            if (node.children[ch] instanceof File) this.stdout.print(`file  ${ch}\n`)
            else this.stdout.print(`dir   \x1B[0;36m${ch}\x1B[0m\n`)
        })

        return 0;
    }
}