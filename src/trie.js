export default class Trie {
    constructor() {
        this.trie = {}
    }

    addWord (string) {
        let current = this.trie
        for (const char of string) {
            if (!current.hasOwnProperty(char)) {
                current[char] = {}
            }
            current = current[char]
        }
        current[`finished`] = string
    }

    removeWord (string) {
    }

    possibilities (substring) {
        const possibilities = []
        if (substring.length === 0) return possibilities //wait until at least 1 letter is typed otherwise possibilities are EVERY word
        let current = this.trie
        for (const char of substring) {
            if (!current.hasOwnProperty(char)) return possibilities 
            current = current[char]
        }        
        dfs(current)
        function dfs (current) {
            for (const key in current) {
                if (key === `finished`) possibilities.push(current[key])
                else dfs(current[key])
            }
        }
        return possibilities
    }
}
