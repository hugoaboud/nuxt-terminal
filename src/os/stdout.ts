import { Terminal } from 'xterm'

/**
 * Outputs stuff to terminal
 */
export default class StdOut {

    constructor(
        private term: Terminal
    ) {

    }

    /**
     * Prints a buffer to the terminal, wraping by word.
     * @param buffer 
     * @param offset 
     */
    print(buffer: string, offset = 0): void {
        let cols = this.term.cols - offset;
        let last_space = 0;
        for(let c = 0; c < buffer.length; c++) {
            let newline = false;
            if (c >= cols) {
                c = last_space;
                newline = true;
            }
            else if (c < buffer.length-1 && buffer[c] !== '\n') {
                if (buffer[c] === ' ') last_space = c;
                continue;
            }
            this.term.write(buffer.slice(0,c+1).replace('\n','\n\r') + (newline?'\n\r':''));
            buffer = buffer.slice(c+1);
            c = -1;
            last_space = 0;
        }
    }

}