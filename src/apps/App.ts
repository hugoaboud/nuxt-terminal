import Filesystem, { INode } from "@/os/filesystem";

import StdOut from "@/os/stdout";
import { AppVueComponent } from "@/os/vue";
import { ExtendedVue } from "vue/types/vue";

export default abstract class NuxtTerminalApp<T extends ExtendedVue<Vue,any,any,any,any> = ExtendedVue<Vue,any,any,any,any>> {

    protected vue: AppVueComponent<T>

    constructor(
        vue: T,
        protected fs: Filesystem,
        protected node: INode,
        protected stdout: StdOut
    ) {
        this.vue = vue as any;
    }

    abstract main(args: string[]): Promise<number>

}