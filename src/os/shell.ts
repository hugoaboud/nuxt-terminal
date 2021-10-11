import cat from "@/apps/cat";
import ls from "@/apps/ls";
import NuxtTerminalApp from "@/apps/App";
import { Terminal } from "xterm";
import Filesystem, { Folder } from "./filesystem";
import StdOut from "./stdout";

export default class Shell {

    user: string = ''
    domain: string = 'nuxt-terminal'

    private buffer: string = ''
    private cursor: number = 0

    private history: string[] = []
    private hcursor: number = -1

    private folder: Folder

    apps: Record<string, typeof NuxtTerminalApp>

    constructor(
        private term: Terminal,
        private fs: Filesystem,
        private stdout: StdOut,
        apps: (typeof NuxtTerminalApp)[]
    ) {
        term.onKey(({key}) => this.onKey(key));
        this.folder = fs.root;

        this.apps = {
            'ls': ls,
            'cat': cat,
            ...apps.reduce((a,x) => ({...a,[x.name]:x}), {})
        }
        console.log(this.apps);
    }

    private get head() {
        return '\x1B[0;35m' + ((this.user && this.user.length)?this.user+'@':'') + this.domain + '\x1B[0m:\x1B[0;36m' + this.folder.path + '\x1B[0m$ '
    }

    private onKey(key: string) {
        let code = key.charCodeAt(0);
        // enter
        if (code == 13) {
            return this.run();
        }
        // arrows
        if (code == 27) {
            //console.log(key);
            if (key == '\x1B[A') { // up
                return this.scrollHistory('up');
            }
            if (key == '\x1B[B') { // down
                return this.scrollHistory('down');
            }
            if (key === '\x1B[D') { // left
                if (this.cursor == 0) return;
                this.cursor--;
                return this.term.write(key);
            }
            if (key === '\x1B[C') { // right
                if (this.cursor >= this.buffer.length) return;
                this.cursor++;
                return this.term.write(key);
            }
            if (key === '\x1B[1;5D') { // home
                this.term.write('\x1B[D'.repeat(this.cursor));
                this.cursor = 0;
                return;
            }
            if (key === '\x1B[1;5C') { // end
                this.term.write('\x1B[C'.repeat(this.buffer.length-this.cursor));
                this.cursor = this.buffer.length;
                return;
            }
            if (key === '\x1B[3~') { // delete
                if (this.cursor >= this.buffer.length) return;
                this.buffer = this.buffer.slice(0,this.cursor) + this.buffer.slice(this.cursor+1);
                return this.term.write(this.buffer.slice(this.cursor) + ' ' + '\x1B[D'.repeat(this.buffer.length+1-this.cursor))
            }
        }
        // backspace
        if (code == 127) {
            if (this.cursor == 0) return;
            if (this.cursor == this.buffer.length) this.buffer = this.buffer.slice(0,-1);
            else this.buffer = this.buffer.slice(0,this.cursor-1) + this.buffer.slice(this.cursor);
            this.cursor--;
            return this.term.write('\x1B[D' + this.buffer.slice(this.cursor) + ' ' + '\x1B[D'.repeat(this.buffer.length+1-this.cursor))
        }
        // ignore non-ascii chars
        if (code < 32) return;
        if (this.cursor == this.buffer.length) {
            this.buffer += key;
            this.term.write(key);
        }
        else {
            this.buffer = this.buffer.slice(0,this.cursor) + key + this.buffer.slice(this.cursor);
            this.term.write(this.buffer.slice(this.cursor) + ' ' + '\x1B[D'.repeat(this.buffer.length-this.cursor))
        }
        this.cursor++;
    }

    scrollHistory(dir: 'up' | 'down') {
        if (dir === 'up') {
            if (this.hcursor >= this.history.length-1) return;
            this.hcursor++;
        }
        if (dir === 'down') {
            if (this.hcursor < 0) return;
            this.hcursor--;
        }
        this.buffer = '';
        if (this.hcursor >= 0) this.buffer = this.history[this.hcursor];
        this.term.write(
            '\x1B[D'.repeat(this.cursor) +
            this.buffer
        );
        if (this.cursor > this.buffer.length) {
            this.term.write(' '.repeat(this.cursor - this.buffer.length));
            this.term.write('\x1B[D'.repeat(this.cursor - this.buffer.length));
        }
        this.cursor = this.buffer.length;
    }

    async run(cmd?: string) {
        
        let buffer = cmd || this.buffer;
        this.term.write('\n\r');
        
        if (buffer.length) {
            let args = buffer.split(' ')
            console.log(args);

            if (this.apps[args[0]]) {
                // @ts-ignore: cant construct abstract NuxtTerminalApp.
                // you should obviously only pass NuxtTerminalApp implementations to this.apps
                let app = new this.apps[args[0]](this.fs, this.folder, this.stdout);
                await app.run(args);
            }
            else if (args[0] === 'clear') this.term.reset();
            else if (args[0] === 'cd') this.cd(args[1]);
            else this.stdout.print(`shell: ${buffer}: command not found`);

            this.history.unshift(buffer);
            if (this.history.length > 10) this.history.pop();
        }
        
        this.term.write(this.head);
        if (!cmd) {
            this.buffer = '';
            this.cursor = 0;
            this.hcursor = 0;
        }
    }

    /**
     * Moves to a folder node by path
     * @param local Current local inode (for relative addresses)
     * @param path  UNIX path 
     * @param print Print method callback 
     */
     cd(path: string): void {
        if (!path) return;
        let node = null;
        try {
            node = this.fs.node(this.folder, path)!;
        } catch (e) { return this.stdout.print(e as string);}

        if (node instanceof File)
            return this.stdout.print(`cd: '${node.name}': Not a directory`);
        this.folder = node;
    }

}