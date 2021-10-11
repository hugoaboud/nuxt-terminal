export default class Color {
    static Red(str: string) {
        return '\x1B[0;31m' + str + '\x1B[0m';
    }
    static Green(str: string) {
        return '\x1B[0;32m' + str + '\x1B[0m';
    }
    static Blue(str: string) {
        return '\x1B[0;34m' + str + '\x1B[0m';
    }
    static Purple(str: string) {
        return '\x1B[0;35m' + str + '\x1B[0m';
    }
    static Cyan(str: string) {
        return '\x1B[0;36m' + str + '\x1B[0m';
    }
}