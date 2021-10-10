import { File } from "@/os/filesystem";
import { TerminalApp } from "./TerminalApp";

export default class ls extends TerminalApp {
    
    async run(args: string[]): Promise<number> {

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
                this.stdout.print(`\t${node.name}\t(file)`);
                return -1;
            }
        }

        Object.keys(node.children).map(ch => {
            if (node.children[ch] instanceof File) this.stdout.print(`file  ${ch}`)
            else this.stdout.print(`dir   \x1B[0;36m${ch}\x1B[0m`)
        })

        return 0;
    }
}