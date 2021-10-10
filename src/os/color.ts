export module Color {
    export function Red(str: string) {
        return '\x1B[0;31m' + str + '\x1B[0m';
    }
    export function Green(str: string) {
        return '\x1B[0;32m' + str + '\x1B[0m';
    }
    export function Blue(str: string) {
        return '\x1B[0;34m' + str + '\x1B[0m';
    }
    export function Purple(str: string) {
        return '\x1B[0;35m' + str + '\x1B[0m';
    }
    export function Cyan(str: string) {
        return '\x1B[0;36m' + str + '\x1B[0m';
    }
}