import Filesystem, { INode } from "@/os/filesystem";
import StdOut from "@/os/stdout";

export default abstract class NuxtTerminalApp {

    constructor(
        protected fs: Filesystem,
        protected node: INode,
        protected stdout: StdOut
    ) {}

    abstract main(args: string[]): Promise<number>

}