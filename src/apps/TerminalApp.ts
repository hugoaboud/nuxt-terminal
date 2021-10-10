import Filesystem, { INode } from "@/os/filesystem";
import StdOut from "@/os/stdout";

export abstract class TerminalApp {

    constructor(
        protected fs: Filesystem,
        protected node: INode,
        protected stdout: StdOut
    ) {}

    abstract run(args: string[]): Promise<number>

}