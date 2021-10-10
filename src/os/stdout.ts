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
        buffer.split('\n').map(line => {
            while (line.length) {
                if (line.length <= cols) {
                    this.term.write(line + '\n\r');
                    cols = this.term.cols;
                    return;
                }
                let l = cols;
                if (line[l+1] === ' ') {
                    this.term.write(line.slice(0,l+1) + '\n\r');
                    line = line.slice(l+2)
                }
                else {
                    while (line[l] !== ' ' && l > 0) l--;
                    this.term.write(line.slice(0,l) + '\n\r');
                    line = line.slice(l+1)
                }
                cols = this.term.cols;
            }
        })
    }

}